import mongoose from 'mongoose'

const objectIdValidator = (req, res, next) => {
    const id = req.params.id;
    const idValido = mongoose.Types.ObjectId.isValid(id)
    if(!idValido){
        return res.status(400).json({mensagem: 'Object ID ínvalido'})
    } else{
        next();
    }
}
export default objectIdValidator