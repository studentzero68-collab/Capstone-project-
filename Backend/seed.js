require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/User')

const users = [
  {
    username: 'Alex Mokoena',
    email: 'guest@zero.com',
    password: 'guest123',
    role: 'user',
  },
  {
    username: 'Lerato Khumalo',
    email: 'lerato@zero.com',
    password: 'lerato123',
    role: 'user',
  },
  {
    username: 'Zero Admin',
    email: 'admin@zero.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    username: 'Host Manager',
    email: 'host@zero.com',
    password: 'host123',
    role: 'host',
  },
]

async function seed() {
  await mongoose.connect(process.env.MONGO_URI)

  for (const user of users) {
    const existingUser = await User.findOne({ email: user.email }).select('+password')

    if (existingUser) {
      existingUser.username = user.username
      existingUser.role = user.role
      existingUser.password = user.password
      await existingUser.save()
    } else {
      await User.create(user)
    }
  }

  console.log(`Seeded ${users.length} users`)
}

seed()
  .catch((error) => {
    console.error('Seeding failed:', error.message)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
  })