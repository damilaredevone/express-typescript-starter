import { Document, Schema, Model, model, Error } from 'mongoose'
import { compare, genSalt, hash } from 'bcrypt'

type UserDocument = Document & {
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    password: string
}

export type IUser = UserDocument & {
    comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<UserDocument>({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        trim: true,
        unique: true
    },
    phone: String,
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

userSchema.pre<UserDocument>('save', function (next): void {
    if (this.isModified('password')) {
        genSalt(10, (err, salt) => {
            if (err) return next(err)
            hash(this.password, salt, (err, hash) => {
                if (err) return next(err)
                this.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    const { password }: UserDocument = this
    return new Promise(function (resolve, reject) {
        compare(candidatePassword, password, function (err: Error, isMatch: boolean) {
            if (err) return reject(err)
            return resolve(isMatch)
        })
    })
}

export type UserModel = Model<UserDocument> & {

}

export const User: UserModel = model<UserDocument, UserModel>("User", userSchema);

export default User

