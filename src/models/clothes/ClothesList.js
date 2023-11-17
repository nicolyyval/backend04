export class ClothesList{
    constructor(){
        this.clothes = [];
    }

    addClothes(clothes){
        this.clothes.push(clothes);
    }

    getClothesById(id){
        return this.clothes.find(clothes => clothes.id == id);
    }

    getAllClothes(){
        return this.clothes;
    }

    removeClothes(id){
        this.clothes = this.clothes.filter(clothes => clothes.id != id);
    }

    updateClothes(id, name, type, size, color, image, quantity){
        this.clothes = this.clothes.map(clothes => {
            if(clothes.id == id){
                clothes.name = name;
                clothes.type = type;
                clothes.size = size;
                clothes.color = color;
                clothes.image = image;
                clothes.quantity = quantity;
            }
            return clothes;
        });
        return this.getClothesById(id);
    }
}

//  id, nome, tipo, tamanho, cor, imagem, e quantidade em estoque