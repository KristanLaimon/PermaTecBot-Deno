FROM denoland/deno:ubuntu

WORKDIR /permabotstuff/

COPY . .

EXPOSE 443 80 88 8443

RUN deno cache ./main.ts
CMD ["deno", "run", "--allow-all", "--unstable-cron", "./main.ts"]

# deno run --allow-all --unstable-cron ./main.ts