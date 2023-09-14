import ytdl from 'ytdl-core';
import fs from 'fs'

export const download = (videoID) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoID
    console.log('Realizando o Download do vídeo:', videoID)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000

        if (seconds > 60) {
          throw new Error("A duração desse vídeo é maior do que 60 segundos.")
        }

      }).on("end", () => {
        console.log("Download do vídeo finalizado.")
        resolve()
      }).on("error", (error) => {
        console.log("Erro ao baixar o vídeo, Detalhes do error:", error)
        reject(error)
      }).pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })