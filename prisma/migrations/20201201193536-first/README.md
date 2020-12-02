# Migration `20201201193536-first`

This migration has been generated by DWARF-Markus at 12/1/2020, 8:35:36 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Company" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "days" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "CompanyType" (
"id" SERIAL,
    "companyId" INTEGER,
    "type" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "CompanySize" (
"id" SERIAL,
    "companyId" INTEGER,
    "size" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Employee" (
"id" SERIAL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "companyId" INTEGER,

    PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "Company.email_unique" ON "Company"("email")

CREATE UNIQUE INDEX "Employee.email_unique" ON "Employee"("email")

ALTER TABLE "CompanyType" ADD FOREIGN KEY("companyId")REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "CompanySize" ADD FOREIGN KEY("companyId")REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "Employee" ADD FOREIGN KEY("companyId")REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201201193536-first
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,45 @@
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Company {
+  id          Int           @default(autoincrement()) @id
+  name        String
+  createdAt   DateTime      @default(now())
+  email       String        @unique
+  password    String
+  days        String
+  CompanyType CompanyType[]
+  CompanySize CompanySize[]
+  Employee    Employee[]
+}
+
+model CompanyType {
+  id        Int      @default(autoincrement()) @id
+  companyId Int?
+  type      String
+  Company   Company? @relation(fields: [companyId], references: [id])
+}
+
+model CompanySize {
+  id        Int      @default(autoincrement()) @id
+  companyId Int?
+  size      String
+  Company   Company? @relation(fields: [companyId], references: [id])
+}
+
+model Employee {
+  id           Int      @default(autoincrement()) @id
+  firstName    String
+  lastName     String
+  email        String   @unique
+  password     String
+  profileImage String
+  companyId    Int?
+  Company      Company? @relation(fields: [companyId], references: [id])
+}
```

