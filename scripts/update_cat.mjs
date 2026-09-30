import mongoose from 'mongoose';

const uri = 'mongodb+srv://hieucv204_db_user:7XWOE7IqidhpvmLW@cluster0.jclrhni.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0';

async function update() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const res = await db.collection('articles').updateMany(
    { category: { $ne: 'comedy' } },
    { $set: { category: 'comedy' } }
  );
  console.log('Updated articles count:', res.modifiedCount);
  process.exit(0);
}

update().catch(err => {
  console.error(err);
  process.exit(1);
});
