import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
    name:{ type: String, reqired: true},
    desc: {type: String, reqired: true},
    bgColour: {type : String, reqired: true},
    image: {type: String, reqired:true}
})

const albumModel = mongoose.models.album || mongoose.model("album", albumSchema);

export default albumModel;