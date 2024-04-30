export default (file)=>{
    return new Promise((resolve, reject)=>{

      let imageUri 
      console.log(file)
      const data = new FormData()
      data.append("file",file)
      data.append("cloud_name","dk7aruhsq")
      data.append("upload_preset","z1v6zugh")
      fetch("https://api.cloudinary.com/v1_1/dk7aruhsq/image/upload",{
         method:"post",
         body:data
      })
      .then(res=>res.json())
      .then(data=>{
         imageUri = data.url
         console.log(imageUri)
         return resolve(imageUri)
      })
      .catch(err=>{
         return reject(err)
      })    



    })
 }