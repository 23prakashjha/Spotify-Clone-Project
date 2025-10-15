import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    name:{ type: String, reqired: true},
    desc: {type: String, reqired: true},
    album: {type: String, reqired:true},
    image: {type: String, reqired:true},
    file: {type:String, reqired:true},
    duration: {type : String, reqired: true}
})

const songModel = mongoose.models.song || mongoose.model("song",songSchema);

export default songModel;