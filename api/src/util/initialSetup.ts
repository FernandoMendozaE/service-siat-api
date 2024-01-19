import Role from '../model/Role'
;(async () => {
  try {
    const count = await Role.estimatedDocumentCount() // ? Contar si existe documentos
    if (count > 0) return

    await Role.insertMany([{ name: 'user' }, { name: 'moderator' }, { name: 'admin' }])
  } catch (error) {
    console.error(error)
  }
})()
