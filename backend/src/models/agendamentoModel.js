import mongoose from 'mongoose';

const agendamentoSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId
  },
  horario: {
    type: String,
    required: true,
    maxLength: 5
  },
  data: {
    type: Date,
    required: true
  },
  pacienteNome: {
    type: String,
    required: true
  },
  unidade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Unidade",
    required: true
  },
  atendente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Atendente",
    required: true
  }
},{
  versionKey: false
},{
  timestamps: true
});

const Agendamento = mongoose.model("Agendamento", agendamentoSchema);

export default Agendamento;