Improvements:

- The id's are only incrementing and never resetting - could save all previous users, and setup an object so we could see preveious car booking history

Reseed database:
npx prisma migrate reset
Press -y

It automatically reseeds, so the database should be freshly populated with new data
