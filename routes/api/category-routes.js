const router = require('express').Router();
const { where } = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {

  try {
    const CategoryData = await Category.findAll({
      include: [{
        model: Product,
        attributes: ['id', 'product_name','price','stock','category_id']
      }]
    });
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {

try {
  const CategoryData = await Category.findByPk(req.params.id, {
    include: [{model: Product,
      attributes: ['id', 'product_name','price','stock','category_id']
    }]
  });
  if (CategoryData){
    res.status(404).json({ message: 'No Category found with this id!'});
    return;

  }
  res.status(200).json(CategoryData);

} catch (err){
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  try {
    const locationData = await Category.create({
      category_id: req.body.category_id,
    });
    res.status(200).json(locationData);
    
  } catch (err){
    res.status(400).json(err);
  
  }

});

router.put('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.update({
      category_id: req.body.category_id,

      },
      {
        where: {
          id: req.params.id
        },
      });
    if (!CategoryData){
      res.status(404).json({message: 'No category found with that ID'});
      return;
    }
    res.status(200).json(CategoryData);
  } catch (err){
    res.status(500).json(err);

  }

});

router.delete('/:id' ,async(req, res) => {
  try {
    const CategoryData = await Category.destroy ({
      where: {
        id: req.params.id,

      },
    });
    if (!CategoryData){
      res.status(404).json({message: 'No Category found with that ID'});
      return;
    }
    res.status(200).json(CategoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
