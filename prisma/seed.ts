import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const adminEmail = "nguyendinhchien19042003@gmail.com"
  const adminPassword = "admin123"

  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (existingUser) {
    console.log("Admin user already exists")
    return
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 12)

  const adminUser = await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: "Nguyễn Đình Chiến",
    },
  })

  console.log("Admin user created:", adminUser.email)
  console.log("Password:", adminPassword)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
