import React, { useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { fetchOneProductDetails } from '../features/product/productSlice';

const ProductDetails = ({match}) => {


    const dispatch =useDispatch()
    const {products, isError, isLoading }=useSelector(state=>state.products)
    let { id } = useParams();

    useEffect(()=>{
        dispatch(fetchOneProductDetails(id))
    }, [dispatch, id])


  return (
    <div>
        <div>
            <div>
                <Carousel>
                    {products.photos&&
                        products.photos.map((item,i)=>(
                            <img key={item._id} src={item.secure_url} alt={`${i} Slide`} />
                        ))}
                </Carousel>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails