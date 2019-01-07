import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const recipeSchema = new Schema({

   name:{
       type: String,
       required: true
   },
    description:{
        type: String,
        required: true,
        default: "Sem descrição."
    },
    photo:{
        type: String,
        default: "no_image"
    },
    video:{
       type: String
    },
    categories:{
        type: [String],
        default: ['Geral']
    },
    ingredients:{
        type: [String],
        required: true,
        validate:{
            validator: function (value) {
                if (value.length === 0){
                    return false;
                }
            }
        }

    },
    prepareSteps:{
        type: [String],
        required: true,
        validate:{
            validator: function (value) {
                if (value.length === 0){
                    return false;
                }
            }
        }

    },
    prepareTime:{
        type: Number
    },
    portions:{
        type: Number,
        default: 1
    },
    user:{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
});


export default mongoose.model('Recipe', recipeSchema);