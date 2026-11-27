# Radar em container (Azure App Service, AWS ou local). Node puro, sem dependências: não há npm install.
# Build:  docker build -t radar .        (ou, sem Docker na máquina: az acr build -r <registro> -t radar:<versão> .)
# Rodar:  docker run -p 8080:8080 -e RADAR_LOGIN_USER=... -e RADAR_LOGIN_PASS=... -v radar-dados:/dados radar
FROM node:24-slim

ENV NODE_ENV=production \
    PORT=8080 \
    RADAR_DATA_DIR=/dados

WORKDIR /app
COPY . .
# Pasta dos dados gravados (banco, índice, envios, conversas, auditoria). Na Azure, aponte RADAR_DATA_DIR para /home/...
# Roda como root porque o /home montado pelo App Service (compartilhamento SMB) não aceita trocar o dono das pastas.
RUN mkdir -p /dados
EXPOSE 8080
# Na primeira subida com a pasta de dados vazia, o servidor monta o banco e o índice a partir de data/corpus.
CMD ["node", "--disable-warning=ExperimentalWarning", "src/server.js"]
