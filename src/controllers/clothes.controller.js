import { Clothes } from "../models/clothes/Clothes.js";
import { ClothesList } from "../models/clothes/ClothesList.js";

const list = new ClothesList();

export const getClothes = (req, res) => {
    const clothes = list.getAllClothes();
    if (clothes.length) {
        return res.status(404).send(
            clothes);
    }
    return res.status(200).send(
        { message: "Não há roupas cadastradas!" });
};

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
    if (!name || !type || !size || !color || !image || !quantity) {
        return res.status(400).send(
            { message: "Parâmetros inválidos!" }
        );
    }

    const clothes = new Clothes(name, type, size, color, image, quantity);
    list.addClothes(clothes);
    return res.status(201).send({ message: "Aluno criado com sucesso!", clothes, });
}

export const updateClothes = (req, res) => {
    const { id } = req.params;
    const { name, type, size, color, image, quantity} = req.body;
    if (!name || !type || !size || !color || !image || !quantity) {
        return res.status(400).send(
            { message: "Missing required informations!" }
        );
    }
    const clothes = list.updateClothes(id, name, type, size, color, image, quantity);
    if (!clothes) {
        return res.status(404).send(
            { message: `Clothing with id ${id} not found!` }
        );
    }

    const updatedClothes = list.updateClothes(id, name, type, size, color, image, quantity);
    return res.status(200).send({ message: "Clothing updated successfully!", updatedClothes, });
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
        { message: "Clothing found with success!", clothes, }
    );
}

//(id, name, type, size, color, image, quantity);