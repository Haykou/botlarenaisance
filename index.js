
const discord = require('discord.js');
const bot = new discord.Client();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp: []}).write()

var prefix = ("//")

bot.on('message', function (message) {
    if (message.content === 'coucou') {
        message.reply ('Salut !')
    }
} )

bot.on('message' ,function (message) {
    if (message.content === 'salut') {
        message.channel.send('salutation !')
    }
})

bot.on('messsage', message => {

    var msgauthor = message.author.id;

    if (message.author.bot)return;
    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
        console.log(userxdb);
        var userxp = Object.values(userxpdb)
        console.log(iserxp)
        console.log(`Nombre d'xp: ${userxp[1]}`)

        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();

    if (message.content === prefix + "xp"){
        var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp)
        var xp_embed = new Discord.RichEmbed()
            .setTitle(`Stat des XP de ${message.author.username}`)
            .setColor(`#F4D03F`)
            .setDescription("Affichage des XP")
            .addFiled("XP:", `${xpfinal[1]} xp`)
            .setFooter(":p")
        message.channel.send({embed: xp_embed});
}}})        

bot.login("NDM5ODI5ODAzMTk4MDU0NDAw.DcY3AA.N0e8oP-nFGWbUpPTGQHZVbiSaes'");