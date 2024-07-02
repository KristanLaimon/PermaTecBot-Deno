# PermaTecBot

A utility bot telegram made with Deno and Typescript for linux amd64x arch..

<center>
	<img src="https://i.imgur.com/24qXDbH.jpg" alt="permalog" width=300>
<center/>

# How to use?

## Local

1. **Make sure you have installed Deno runtime** you can do it here:

https://docs.deno.com/runtime/manual/getting_started/installation

2. Git clone this repo and then change the following values in .env-renamethis

```
BOT_TOKEN = "yourtokenapihere"
STARTING_DAY = "YYYY-MM-DD"
```

then rename .env-renamethis to .env

3. Run the following command on same repo folder:

```
deno run --allow-all --unstable-cron ./main.ts (or .\main.ts on windows)
```

## Docker

To run create a "ez" container just run the following replacing:

```docker
docker run -e BOT_TOKEN='yourtelegrambottoken' -e STARTING_DAY='putYourServerStartingDate'--name 'putthecontainernamehere' foxxylover/permatecbot:'selectatag'
```

- --name: Set container name to reference to it in docker CLI
- BOT_TOKEN: Put your telegram API token with @botfather
- STARTING_DAY: Date has to be in format "2024-06-23" (YYYY-MM-DD)
- selecttag: Select an available tag from docker hub, you can see it here:
  https://hub.docker.com/repository/docker/foxxylover/permatecbot/general (e.g: ':v1', ':v2-deno')

Note: Starting day is just to have a starting point and manages publications date for every difficult change to announce.
For difficults announces you can see:

https://permadeath.fandom.com/es/wiki/Cambios_de_dificultad (Spanish)
