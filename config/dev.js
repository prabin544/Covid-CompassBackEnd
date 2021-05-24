// oh no, you've done the security flaw and exposed your DB password here. Literally anyone could use this to log in and drop your entire database.
// this is why we use .env files that are .gitignored.
module.exports={
    mongoURI:"MONGO URI goes here",
}
