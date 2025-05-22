<ul className="productUl">
    {products.map((product) => (
        <li key={product.id} className="productList">
            <Link href={`/product/watersystem/${product.id}`} rel="preload" >{product.name}</Link>
            <Image src={arrowLeft} width={24} height={24} alt="arrow-left" ></Image>
        </li>
    ))}

</ul>




