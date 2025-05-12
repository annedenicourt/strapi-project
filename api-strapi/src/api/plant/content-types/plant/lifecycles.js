module.exports = {
  async beforeDelete(event) {
    const { id } = event.params.where;
    //console.log("beforeDelete triggered", id);
    
    const plant = await strapi.entityService.findOne('api::plant.plant', id, {
      populate: ['images'],
    });

    //console.log("plant found:", plant);

    if (plant.images && plant.images.length > 0) {
      await Promise.all(
        plant.images.map((image) => {
          return strapi.query('plugin::upload.file').delete({ where: { id: image.id } });
        })
      );
    }
  }
}; 