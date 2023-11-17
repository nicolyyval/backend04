import { Clothes } from "../models/clothes/Clothes.js";
import { ClothesList } from "../models/clothes/ClothesList.js";

const list = new ClothesList();

// export const getClothes = (req, res) => {
//     const clothes = list.getAllClothes();
//     if (clothes.length) {
//         return res.status(404).send(
//             clothes);
//     }
//     return res.status(200).send(
//         { message: "Não há roupas cadastradas!" });
// };

export const getSClothesById = (req, res) => {

    const { id } = req.params;
    const clothes = list.getClothesById(id);
    if (!clothes) {
        return res.status(404).send(
            { message: `The clothing with id ${id} not found!` }
        );
    }
    return res.status(200).send(
        clothes
    );
};

export const createClothes = (req, res) => {
    const { name, type, size, color, image, quantity } = req.body;

      let errors = [];

    if (name.length < 6) {
        errors.push("Name must have at least six characters");
    }
    if (type.length > 50) {
        errors.push("Type must have at least fifty characters");
    }
    if (size != "S" && size != "M" && size != "L" && size != "LL" && size != "XL") {
        errors.push("Size must be S, M, L, LL or XL");
    }
    if (color.length > 20){
        errors.push("Color must have at least twenty characters");
    }
    if (quantity < 1 || quantity > 15000 || !Number.isInteger(quantity)){
        errors.push("Quantity must be a integer number between 1 and 15000");
    }
    if (!image.match(/(https?:\/\/.*\.(?:png|jpg|jpeg|webp))/i)){
        errors.push("Image must be a valid URL with .jpg, .png or .jpeg");
    }
    if (errors.length) {
        return res.status(400).send({ messages: errors });
    } else {
        const clothes = new Clothes(name, type, size, color, image, quantity);
        list.addClothes(clothes);
        return res.status(201).send({ message: "Roupa criada com sucesso!", clothes, });
    }

   
}

export const updateClothes = (req, res) => {
    const { id } = req.params;
    const { name, type, size, color, image, quantity } = req.body;
    let errors = [];
    
    if (name.length < 4 || name.length > 40) {
        errors.push("Name must have at least six characters");
    }
    if (type.length > 50) {
        errors.push("Type must have at least fifty characters");
    }
    if (size != "S" && size != "M" && size != "L" && size != "LL" && size != "XL") {
        errors.push("Size must be S, M, L, LL or XL");
    }
    if (color.length > 20){
        errors.push("Color must have at least twenty characters");
    }
    if (quantity < 1 || quantity > 15000 || !Number.isInteger(quantity)){
        errors.push("Quantity must be a integer number between 1 and 15000");
    }
    if (!image.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/i)){
        errors.push("Image must be a valid URL with .jpg, .png or .jpeg");
    }
    if (errors.length) {
        return res.status(400).send({ messages: errors });
    }  else{
       
    const updatedClothes = list.updateClothes(id, name, type, size, color, image, quantity);
    return res.status(200).send({ message: "Clothing updated successfully!", updatedClothes, });
    }
   
   
};

export const deleteClothes = (req, res) => {
    const { id } = req.params;
    const clothes = list.getClothesById(id);
    if (!clothes) {
        return res.status(404).send(
            { message: `Clothing not found!` }
        );
    }
    list.removeClothes(id);

    return res.status(200).send(
        { message: "Clothing deleted with success!", clothes, }
    );
}

export const getCloths = (req, res) => {
    const { size, type, color } = req.query;
    let cloths = list.getClothing();

    if(cloths.length == 0){
        return res.status(404).send({ message: "No cloths found" });
    } else {
        if (size) {
            cloths = cloths.filter(cloth => cloth.size === size);
        }
        if (type) {
            cloths = cloths.filter(cloth => cloth.type === type);
        }
        if (color) {
            cloths = cloths.filter(cloth => cloth.color === color);
        }

        let count = cloths.length;
        return res.status(200).send({ count, cloths });
    }
}
//(id, name, type, size, color, image, quantity);