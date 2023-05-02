const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const TagData = await Tag.findAll({
      attributes: ['id','tag_name'],
      include: [
        {
        model: Product,
        attributes: ['id', 'product_name','price','stock','category_id'],
        through: 'ProductTag'
      }
    ],
    });
    res.status(200).json(TagData);

  } catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const TagData = await Tag.findByPk (req.params.id, {
      include: [
        {
        model: Product,
        attributes: ['id', 'product_name','price','stock','category_id'],
        through: 'ProductTag',
      }
    ],
    });
    if (TagData) {
      res.status(404).json({message: 'No tag with this ID'});
      return;
    }
    res.status(200).json(TagData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const TagData = await Tag.create({
      tag_name: req.body.tag_name,

    });
    res.status(200).json(locationData);
    
  } catch (err){
    res.status(400).json(err);
  
  }
  // create a new tag

});

router.put('/:id', async (req, res) => {
  try {
    const TagData = await Tag.update({
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    });
    if (!TagData){
      res.status(404).json({message: 'No tag found with that ID'});
      return;
    }
    res.status(200).json(TagData);

  } catch (err){
    res.status(500).json(err);
  }  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{ 
    const TagData = await Tag.destroy ({
      where: {
        id: req.params.id,
      },
    });
    if (!TagData){
      res.status(404).json({message: 'No Tag found with that ID'});
      return;
    }
    res.status(200).json(TagData);

  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
