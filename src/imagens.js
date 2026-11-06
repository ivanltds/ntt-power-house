// Hospedagem das imagens dos tickets num serviço externo gratuito (ImgBB, https://api.imgbb.com).
// O servidor do Radar não guarda imagem nenhuma: envia a captura ao ImgBB e o ticket fica só com os links.
// As imagens ficam acessíveis a quem tiver o link: use apenas capturas com dados fictícios.
// Sem IMGBB_API_KEY a hospedagem fica desligada e as imagens só servem para a IA descrever o problema.

const ENDPOINT = 'https://api.imgbb.com/1/upload';

export function criarHospedagem(env = process.env, fetchFn = globalThis.fetch) {
  const key = String(env.IMGBB_API_KEY ?? '').trim();
  if (!key) return null;
  const timeout = Number(env.IMGBB_TIMEOUT_MS ?? 30000);
  return {
    nome: 'ImgBB',
    // dataUrl já validada por lerImagens (PNG, JPG, WEBP ou GIF em base64).
    async enviar(dataUrl, nome) {
      const body = new URLSearchParams({ image: String(dataUrl).split(',')[1] ?? '', name: String(nome).replace(/[^\w-]/g, '_').slice(0, 60) });
      let res;
      try {
        res = await fetchFn(`${ENDPOINT}?key=${encodeURIComponent(key)}`, { method: 'POST', body, signal: AbortSignal.timeout(timeout) });
      } catch (err) {
        throw new Error(err.name === 'TimeoutError' ? 'tempo esgotado' : 'sem conexão com o ImgBB');
      }
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.success || !j.data?.url) throw new Error(j.error?.message ? `ImgBB: ${j.error.message}` : `ImgBB respondeu ${res.status}`);
      return { url: j.data.url, thumb: j.data.thumb?.url ?? j.data.medium?.url ?? j.data.url, apagar: j.data.delete_url ?? null, servico: 'imgbb' };
    },
  };
}

// Envia várias imagens em paralelo; o nome leva o código do ticket para achar no painel do ImgBB.
export async function hospedarTodas(hospedagem, imagens, prefixo) {
  return Promise.all(imagens.map((url, i) => hospedagem.enviar(url, `radar-${prefixo}-${Date.now()}-${i + 1}`)));
}
