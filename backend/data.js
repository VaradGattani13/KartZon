import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'VG',
      email: 'unknown@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Mai Nahi Bataunga',
      email: 'maihukaun@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],






    products:[
        {
            // _id:'1',

            name:'Nike Shirt',
            slug:' Nike Slim Shirt',
            category:'Shirts',
            image:'/images/p1.jpg',
            price:2000,
            countInStock:1,
            brand:'Nike',
            rating:4.3,
            numReviews:14,
            desription:'High Quality Premium Shirt'

        },
        {
            // _id:'2',
            name:'Adidas Fit Tshirts',
            slug:' Adidas Fit Shirt',
            category:'Shirts',
            image:'/images/p2.jpg',
            price:1200,
            countInStock:10,
            brand:'Adidas',
            rating:4.0,
            numReviews:14,
            desription:'High Quality Product'

        },
        {
            
            // _id:'3',
            name:'Nike Slim Pants',
            slug:' Nike Slim Pants',
            category:'Pants',
            image:'/images/p3.jpg',
            price:2500,
            countInStock:5,
            brand:'Nike',
            rating:4.1,
            numReviews:9,
            desription:'High Quality Product'

        },
        {  
            //   _id:'4',    
         name:'Adidas Fit Pants',
            slug:' Adidas fit-pants',
            category:'  Pants',
            image:'/images/p4.jpg',
            price:1000,
            countInStock:0,
            brand:'Adidas',
            rating:3.9,
            numReviews:9,
            desription:'High Quality Product'

        }
    ]
}

export default data;
