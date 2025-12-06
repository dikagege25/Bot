import { Telegraf } from 'telegraf'

export const grupPOST = -1003088650853

const bot = new Telegraf('8305018846:AAGLVgOsc3SwcPpbXfJB1QiiKBGfIP2HXvQ')
export async function toPost(media, caption) {
  const text =
    `<blockquote><b>Perhatian</> !!!\nJika BELI = <b>REKBER.</b></blockquote><b><i>Keterangan :</i></b><blockquote expandable>` +
    `${caption.replace('*', '')}</blockquote>` +
    `#REKBER_SETEMPAT`
  await bot.telegram.sendPhoto(grupPOST, media, {
    caption: text,
    parse_mode: 'HTML',
    reply_to_message_id: 72549,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Minta kontak yang POST <-',
            url: `tg://resolve?domain=dream_store_2&text=Minta kontak yang post ${caption}`,
          },
        ],
      ],
    },
  })
}
