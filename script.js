let add_modal = document.querySelector(".add_modal");
let modal_window_one = document.querySelector(".modal-window-one");

add_modal.addEventListener("click", () => {
    modal_window_one.style.display = "flex";
});

window.addEventListener("click", (e) => {
    if (e.target === modal_window_one) {
        modal_window_one.style.display = "none";

    }
});

let input_modal_img = document.querySelector(".input-modal-img");
let input_modal_h1 = document.querySelector(".input-modal-h1");
let input_modal_h4 = document.querySelector(".input-modal-h4");
let input_modal_p = document.querySelector(".input-modal-p");
let input_modal_btn = document.querySelector(".input-modal-btn");



input_modal_btn.addEventListener("click", () => {
    if (!input_modal_h1.value || !input_modal_img.value || !input_modal_h4.value || !input_modal_p.value) {
        alert("«Пожалуйста, заполните все поля».");
        modal_window_one.style.display = "none";
        clearInputs()
        return;
    }

    let fastFood = {
        price: input_modal_h1.value,
        img: input_modal_img.value,
        name: input_modal_h4.value,
        ml: input_modal_p.value,    
    };
    modal_window_one.style.display = "none";
    let fresh = JSON.parse(localStorage.getItem("fresh")) || [];
    fresh.push(fastFood);
    localStorage.setItem("fresh", JSON.stringify(fresh));
    clearInputs()
    readProduct();
});

function clearInputs() {
    input_modal_img.value = "";
    input_modal_h1.value = "";
    input_modal_h4.value = "";
    input_modal_p.value = "";
}


let hero_two = document.querySelector(".hero-two");

function readProduct() {
    hero_two.innerHTML = "";
    let fresh = JSON.parse(localStorage.getItem("fresh")) || [];
    fresh.forEach((el,index) => {
        let div_contant = document.createElement("div");
        let img_modal = document.createElement("img");
        let h1 = document.createElement("h1");
        let h5 = document.createElement("h5");
        let p = document.createElement("p");
        let btn = document.createElement("button");
        let btn_adit = document.createElement("button")
         btn.classList.add("btn") 
         btn_adit.classList.add("btn-adit")
        div_contant.classList.add("div_contant");
        img_modal.classList.add("img-modal")
        hero_two.append(div_contant);
        div_contant.append(img_modal);
        div_contant.append(h1);
        div_contant.append(h5);
        div_contant.append(p);
        div_contant.append(btn);
        div_contant.append(btn_adit)
         

        img_modal.src = el.img;
        h1.innerText = el.price + "₽";
        p.innerText = el.name + " г";
        h5.innerText = el.ml ;
        btn.innerText = "Добавить";
        btn_adit.innerText = "Удалить" 
        
        btn_adit.addEventListener("click",() => {
            readProductDelete(index)
        })
        btn.addEventListener("click",()=>{
            let order = {
              img: el.img,
              h1: el.price,
              p: el.name,
              h5: el.ml, 
              count: 1, 
              
            }

            let orderFood = JSON.parse(localStorage.getItem("food")) || []
            if(orderFood.some((el,idx) => idx === index)){
                alert("Этот прадукт уже добавлена!")
                
            }else{
                orderFood.push(order)
                localStorage.setItem("food", JSON.stringify(orderFood))
                orderProduct()
            }

        })
    });
}
readProduct();

function readProductDelete(id) {
    let fresh = JSON.parse(localStorage.getItem("fresh")) || [];
    fresh.splice(id , 1)
    localStorage.setItem("fresh", JSON.stringify(fresh))
    readProduct()
}

let total_price = document.querySelector(".total_price")
let hero_three = document.querySelector(".hero-three")


function orderProduct() {
    hero_three.innerHTML = ""
    let orderFood = JSON.parse(localStorage.getItem("food")) || []
    orderFood.forEach((el,idx)=> {
    let div_order_one = document.createElement("div");
    let div_order_two = document.createElement("div")
    let div_or = document.createElement("div")
    div_or.classList.add("div_or")
    div_or.prepend(div_order_one)
    div_or.append(div_order_two)
    let img_order = document.createElement("img")
    let h1_order = document.createElement("h1");
    let p_order = document.createElement("p");
    let h5_order = document.createElement("h5")

    let btn_order_plast = document.createElement("button")
    let btn_order_minus = document.createElement("button")
    let p_order_count = document.createElement("p")
    
    img_order.src = el.img;
    h1_order.innerText = el.h1 + "₽"
    p_order.innerText = el.p 
    h5_order.innerText = el.h5 + " г"

     btn_order_minus.innerText = "-"
     btn_order_plast.innerText = "+"
     p_order_count.innerText = el.count


     let  counter = el.count
     btn_order_plast.addEventListener("click",()=>{
      counter++
      p_order_count.innerText = counter
       total_price.innerText = el.h1 * counter + "₽"
       allCount.innerText = counter
     })
     
     let allCount = document.querySelector(".allCount")

     btn_order_minus.addEventListener("click",()=>{
      if (counter > 1 ) {
          counter--
          p_order_count.innerText = counter
          total_price.innerText = el.h1 * counter + "₽"
          allCount.innerText = counter
      }
     })

     btn_order_plast.classList.add("btn-order-plast")
     btn_order_minus.classList.add("btn-order-minus");
     p_order_count.classList.add("p-order_count");

     div_order_one.classList.add("divo-order-one");
     div_order_two.classList.add("div-order-two");

    let delete_order = document.createElement("button")
    delete_order.innerText = "delete"
    delete_order.classList.add("delete_order")
    delete_order.addEventListener("click",()=>{
         deleteOrderProduct(idx)
    })


    div_or.prepend(img_order);
    hero_three.append(div_or);
    div_order_one.append(h1_order);
    div_order_one.append(p_order);
    div_order_one.append(h5_order);
    div_order_two.append(btn_order_plast);
    div_or.append(delete_order)
    div_order_two.append(p_order_count);
    div_order_two.append(btn_order_minus);
    }) 
}
orderProduct();

function deleteOrderProduct(id) {
    let orderFood = JSON.parse(localStorage.getItem("food")) || []
    orderFood.splice(id,1)
    localStorage.setItem("food",JSON.stringify(orderFood))
    orderProduct()
}
