import { Telegraf } from 'telegraf'
import { keyboardCariAkun } from '../project_dika/keyboard/keyboard.js'
import { keyboardStart } from '../project_dika/keyboard/keyboardStart.js'
const grupPost = -1003024931783
const bot = new Telegraf('8305018846:AAGLVgOsc3SwcPpbXfJB1QiiKBGfIP2HXvQ')
export const formData = new Map()
bot.start(async (ctx) => {
  formData.clear()
  await ctx.reply(
    `Selamat datang di <b>DREAMSTORE!</b>

Bergabunglah dengan DREAMSTORE agar mendapat pengalaman jual beli dengan lebih baik akun — langsung di Telegram.

💳 <b>Beli dan jual AKUN dalam hitungan detik\n</b>
📈 <b>Rasio penjualan  akun sangat tinggi\n</b>
💸 <b>Layanan rekber ON 24 jam</b>

Anda dapat memulai layanan bot ini secara GRATIS— tanpa berlangganan, tanpa stres.`,
    {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: keyboardStart,
        resize_keyboard: true,
        is_persistent: true,
      },
    },
  )
})
bot
  .on('callback_query', async (msg) => {
    await msg
      .deleteMessage()
      .catch(() => msg.reply(`Jangan spam tap tombol ${msg.from.first_name}!!!`))
      .then(() => {})
      .catch(() => {
        msg.reply(`Jangan spam tekan tombol  !`)
      })
    formData.set('id', msg.from.id)
    msg.answerCbQuery('Loading . . .')
    const callback_data = msg.callbackQuery.data
    formData.set('callback', callback_data)
    console.log(formData)
    switch (callback_data) {
      case 'jual_akun':
        formData.set('type', 'jual_akun')
        console.log(formData)
        msg.reply(
          `<blockquote >🪶 Langkah Selanjutnya
          Salin formulir dan kemudian paste lalu isi sesuai spek akun mu.</><b>Contoh </>:<blockquote>Keterangan : Monsep,allkos. harga 1JT\n#REKBER_SETEMPAT</>Salin format dengan tap tombol 👇`,
          {
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: ' Copy FORMAT ',
                    copy_text: {
                      text: 'Keterangan : (Isi sesuai spek yang ingin anda cari)\n#REKBER_SETEMPAT',
                    },
                  },
                ],
              ],
            },
          },
        )
        break
      case 'arti_reff':
        msg.reply(
          `<blockquote>✅ Arti <b>Reff / Refful</b>

<i>Refful = <b>GARANSI</b>.</i>

> <b>Artinya</b> : Penjual memberikan garansi terhadap akun yang di jual.\n
> <b>Tujuan</b> ? -> Agar pembeli mendapatkan jaminan untuk akun yang akan dia beli.\n
> <b>Apa yang terjadi apa bila penjual kabur ketika akun bermasalah ?</b>
  - identitas penjual akan kami blacklist.
  - pembeli di berikan akses ke identitas penjual .
            \n
Contoh umum:
si A menjual akun 350 k refful \n =  budi menjual akun mengunakan jaminan.</blockquote>`,
          {
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [[{ text: 'Kembali ke menu', callback_data: 'batal' }]],
            },
          },
        )
        break
      case 'arti_rekber':
      case 'rekber':
        msg.reply(
          `<blockquote>✅ Arti <b>Rekber / Rekening bersama</b>

<i>Rekber = <b>JASA PENENGAH</b>.</i>

-> <b>Artinya</b> : Transakasi yang menggunakan jasa penengah / pihak ketiga.\n
-> <b>Tujuan</b> ? -> Agar kedua pihak tidak mengalami penipuan dari pihak SELLER/BUYYER itu sendiri..\n
-> <b>Apa yang terjadi apa bila buyer / seller menolak untuk rekber ??</b>\n\n
-> Itu artinya pihak yang tidak ,au di ajak rekber mempunyai indikasi PENIPUAN</blockquote>` +
            `\n<blockquote expandable><b>Bagaimana cara kerja rekber ?
Pelajari disini &lt; </b>
\n > STEP-STEP REKBER
=======================
1. Penjual mengisi formulir sesuai dengan apa yang sudah di sepakati oleh pembeli & penjual nya sendiri.

2. Jika sudah nanti admin akan mengirimkan payment / rekening,tujuan nya agar pembeli bisa melakukan transfer kepada admin.

3. Pembeli melakukan transfer kepada admin rekber.

NOTE :
JIKA ADMIN BELUM BILANG DANA MASUK PENJUAL JANGAN KIRIM DATA APAPUN KE PEMBELI DENGAN APAPUN ALASAN NYA ITU

4. Jika admin sudah berkata dana sudah masuk berikutnya penjual di persilahkan untuk memberikan data akun yang mau dijual & ce (change email) ke email pembeli.

5. Pembeli mengaman kan data akun yang sudah di berikan oleh penjual ,segala bentuk pengamanan luar tanggung jawab kami maka sebab itu pembeli sebelum membeli akun kami saran kan untul belajar dalam pengamanan akun agar tidak terjadi hal hal yang tidak di inginkan.

6. Jika pembeli sudah mengaman kan akun pembeli wajib konfirmasi ke grup dan katakan DONE / TIDAK.

7.
- Jika transaksi reff maka penjual wajib mengirimkan identitas diri ,tujuan nya untuk menjamin bahwasanya akun yang dijual tidak akan penjual hackback / ambil balik,
dan kirim ident nya ke ADMIN bukan pembeli.

- Jika transaksi NOREFF maka langsung lanjut step ke 8

8. Jika pembeli sudah berkata DONE maka kami akan mencairkan uang transaksi kepada penjual.

====================</blockquote>`,
          {
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [[{ text: 'Kembali ke menu', callback_data: 'menu' }]],
            },
          },
        )
        break
      case 'beli_akun':
        formData.set('type', 'beli_akun')
        msg.reply(
          `🪶 Langkah Selanjutnya <blockquote>Silakan salin formulir dan kemudian paste lalu isi sesuai keinginan mu.</> CONTOH : <blockquote>
    Keterangan : Cari akun ML skin 300+ WR 70% budget 1jt an \n#REKBER_SETEMPAT</>
    Salin format dengan tap tombol 👇`,
          {
            parse_mode: 'HTML',
            reply_markup: { inline_keyboard: keyboardCariAkun },
          },
        )
        breakl
      case 'menu':
        await msg.reply(
          `<b>Information user </>:\n<blockquote>id : ${msg.from.id}\nName : ${msg.from.first_name}\n</blockquote>Tap /posting untuk Posting baru.`,
          {
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: keyboardStart,
              resize_keyboard: true,
              is_persistent: true,
            },
          },
        )
        break
    }
  })
  .catch((err) => console.log(err))

bot
  .on('text', (msg) => {
    const type = formData.get('type')
    if (msg.message.text.includes(`#REKBER_SETEMPAT`)) {
      bot.telegram.sendMessage(
        grupPost,
        `Message dari ${msg.from.first_name} lolos\n <a href="tg://user?id=${msg.from.id}">Tap DIsini untuk chat </>`,
        { parse_mode: 'HTML' },
      )
      if (type === 'jual_akun') {
        msg.reply(
          `Oke sudah benar ${msg.from.first_name}  \nSelanjutnya sekarang kirim maximal 1 foto.`,
          { reply_to_message_id: msg.msgId, parse_mode: 'HTML' },
        )
      } else if (type === 'beli_akun') {
        msg.reply(`Mohon tunggu 5 - 10 menit`)
      }
    } else {
      msg.reply('Harus menyerupai contoh\n#REKBER_SETEMPAT \nHarap coba sekali lagi.')
    }
  })
  .catch(() => {})
bot.launch()
