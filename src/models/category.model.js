import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String
    }
})

categorySchema.statics.addCategory = async function(name){
    if(!name) {
        throw Error('field nust be filled')
    }

    const existedCategory = await this.findOne({ name })

    if(existedCategory) {
        throw Error('Category already exist')
    }

    const category = await this.create({ name })

    return category
}

categorySchema.statics.getAllCategory = async function() {
    const categories = await this.find({}, 'name'); // Retrieves only the 'name' field
    return categories.map(category => category.name);
    // return categories; 
}



export const Category = mongoose.model("Category",categorySchema)