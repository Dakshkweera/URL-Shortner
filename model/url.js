const mongoose =require('mongoose');

const urlschema = new mongoose.Schema({
    shortid: {
        type: String,
        required: true,
        unique: true
    },
    urlgiven: {
        type: String,
        required: true,
        unique: true
    },
    history:[
        {timestamp:{type: Number},ip: { type: String }}
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }  
},{
    timestamps: true
}
);

const Url = mongoose.model('urls', urlschema);

module.exports= Url;