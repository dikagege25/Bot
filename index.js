import 'dotenv/config'
import { Telegraf } from 'telegraf'
import prisma from './lib/prisma.js'
import { uplaodtoCloudinary } from './project_dika/func/photoUploadFunction.js'
import { toPost } from './toPost.js'
const formatBahan = (bahan) => `#${bahan.id} - ${bahan.caption}\n${bahan.imageUrl}`
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(async (ctx) => {
  const count = await prisma.bahan.count()
  const mapping = await prisma.bahan.findMany({ cacheStrategy: { ttl: 0, swr: 0 } })
  await ctx.reply(`Total bahan anda ${count}\nSemangat dik caro cuan nya ahah `, {
    reply_markup: {
      inline_keyboard: mapping.map((dt) => [
        { text: dt.caption, callback_data: `post${dt.id}` },
      ]),
    },
  })
})

bot.command('del', async (msg) => {
  const mapping = await prisma.bahan.findMany({ cacheStrategy: { ttl: 0, swr: 0 } })
  await msg.reply(`\nPilih data yang ingin anda delete `, {
    reply_markup: {
      inline_keyboard: mapping.map((dt) => [
        { text: dt.caption, callback_data: `del${dt.id}` },
      ]),
    },
  })
})

bot.catch((er) => {})
bot.command('bahan_list', async (ctx) => {
  try {
    const list = await prisma.bahan.findMany({ orderBy: { id: 'desc' }, take: 20 })
    if (!list.length) return ctx.reply('Belum ada data bahan.')
    return ctx.reply(list.map(formatBahan).join('\n\n'))
  } catch (err) {
    console.error(err)
    return ctx.reply('Gagal mengambil data bahan.')
  }
})
bot.command('bahan_update', async (ctx) => {
  const [idPart, ...rest] = ctx.message.text.split(' ').slice(1)
  const id = Number(idPart)
  const raw = rest.join(' ')
  const [caption, imageUrl] = raw
    .split('|')
    .map((part) => part?.trim())
    .filter(Boolean)

  if (!id || !caption || !imageUrl) {
    return ctx.reply('Format: /bahan_update <id> <caption> | <imageUrl>')
  }

  try {
    const bahan = await prisma.bahan.update({
      where: { id },
      data: { caption, imageUrl },
    })
    return ctx.reply(`Bahan diperbarui:\n${formatBahan(bahan)}`)
  } catch (err) {
    console.error(err)
    return ctx.reply('Gagal memperbarui bahan (cek ID).')
  }
})

bot.command('bahan_delete', async (ctx) => {
  const id = Number(ctx.message.text.split(' ')[1])
  if (!id) return ctx.reply('Format: /bahan_delete <id>')

  try {
    await prisma.bahan.delete({ where: { id } })
    return ctx.reply(`Bahan dengan ID ${id} dihapus.`)
  } catch (err) {
    console.error(err)
    return ctx.reply('Gagal menghapus bahan (cek ID).')
  }
})
bot.on('photo', async (msg) => {
  const photo = msg.message.photo.pop().file_id
  const fileId = await bot.telegram.getFileLink(photo)
  const response = await uplaodtoCloudinary(fileId.href)
  await prisma.bahan
    .create({
      data: { caption: msg.message.caption, imageUrl: response.secure_url },
    })
    .then((dt) => {
      console.log('Upload data berhaisl' + dt)
      msg.reply(`Berhasil push DATA ` + dt.id, {
        reply_markup: {
          inline_keyboard: [[{ text: 'Post sekarang', callback_data: `post${dt.id}` }]],
        },
      })
    })
})
bot.action(/del/, async (msg) => {
  const id = msg.callbackQuery.data.replace('del', '')
  console.log(id)
  const response = await prisma.bahan.delete({ where: { id: parseInt(id) } })
  if (response) {
    msg.answerCbQuery(`Data ${response.id} Berhasil di hapus`, { show_alert: true })
  }
})
bot.action(/post/, async (msg) => {
  const id = msg.callbackQuery.data.replace('post', '')
  console.log(id)
  const response = await prisma.bahan.findUnique({ where: { id: parseInt(id) } })
  if (response) {
    toPost({ url: response.imageUrl }, response.caption)
  }
})

bot
  .launch()
  .catch((er) => {
    console.log(er)
  })
  .finally(() => {})

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
process.once('beforeExit', async () => {
  await prisma.$disconnect()
})
