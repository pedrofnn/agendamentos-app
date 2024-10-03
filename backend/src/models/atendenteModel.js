import mongoose from "mongoose";

const atendenteSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId
  },
  nome: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
  },
  status:{
    type: Boolean,
    default: true,
  }
}, {
  versionKey: false
});

const Atendente = mongoose.model("Atendente", atendenteSchema);

export default Atendente;