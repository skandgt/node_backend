const express = require("express");
const app = express();

app.use(express.json());

app.use(express.urlencoded({
extended: true
}));

const PORT = 2000;
let productData = [];

app.listen(PORT, () =>{
    console.log("Connected to server at "+ PORT)
});


//create api
app.post("/api/add_product", (req, res) => {
    console.log("Request ", req.body);

    const pData = {
        "id": productData.length + 1,
        "pname": req.body.pname,
        "pprice": req.body.pprice,
        "pdesc": req.body.pdesc
    };

    productData.push(pData);

    console.log("Final", pData)

    res.status(200).send({
        "status_code": "200",
        "message": "Product added successfully",
        "product": pData
    });
});



app.get("/api/get_products", (req, res) => {

    if (productData.length > 0) {
        res.status(200).send({
            "status_code": "200",
            "message": "all Product fetched successfully",
            "product": productData
        });
    }
    else{
        res.status(200).send({
            "status_code": "200",
            "message": "all Product fetched successfully",
            "product": "There are no products"
        });
    }
});



app.put("/api/update_product", (req, res) => {
    const updatedData = {
        "id": req.body.id,
        "pname": req.body.pname
    }
    console.log(updatedData)

    if(productData.length>0){
        for(const i = 0; i < productData.length; i++){
            if(updatedData["id"] == productData[i]["id"]){
                productData[i]["pname"] = updatedData["pname"]
                break;
            }
        }
        res.status(200).send({
            "status_code": "200",
            "message": "Product updated successfully",
            "updated_products": productData
        });
    }
    else{
        res.status(200).send({
            "status_code": "200",
            "message": "No Product to update"
        });
    }
});


app.put("/api/delete_product", (req, res) => {
    console.log("i am inside delete now");
    const productIdToRemove = req.body.id;
    console.log(productIdToRemove);
    if(productData.length > 0){
        const updatedProductData = productData.filter(product => product.id !== productIdToRemove);
        const oldLength = productData.length;
        productData = updatedProductData;

        if(productData.length != oldLength){
            res.status(200).send({
                "status": "200", 
                "message": "Product removed",
                "products": productData
            });
        }
        else{
            res.status(200).send({
                "status": "200", 
                "message": "No product with "+ productIdToRemove +" id found"
            });
        }
        
    }
    else{
        res.status(200).send({
            "status": "200", 
            "message": "No Product removed"
        });
    }
});
