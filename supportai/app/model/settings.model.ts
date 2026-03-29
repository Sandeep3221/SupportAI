import { model, models, Schema } from "mongoose";

interface ISettings{
        ownerId:string
        businessName:string
        supportEmail:string
        knowledgeBase:string
}

const settingsSchema=new Schema<ISettings>({
        ownerId:{
                type:String,
                required:true,
                unique:true
        },
        businessName:{
                type:String,
        },
        supportEmail:{
                type:String,
        },
        knowledgeBase:{
                type:String,
        }

},{timestamps:true})

const Settings = models.Settings || model("Settings", settingsSchema)

export default Settings