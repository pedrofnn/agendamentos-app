import mongoose from "mongoose";

const unidadeSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    nome: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    ativa:{
      type: Boolean,
      default: true,
    }
},{
    versionKey: false
});

const Unidade = mongoose.model("Unidade", unidadeSchema);

export default Unidade;