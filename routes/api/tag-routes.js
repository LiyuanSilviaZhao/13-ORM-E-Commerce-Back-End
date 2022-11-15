const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include: Product,
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: Product,
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    const tag = tagData.get({plain:true});

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const tagCreate = await Tag.create(req.body);
    res.status(200).json(tagCreate);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = Tag.update(
      req.body,
      {where:{id:req.params.id}}
    );
    if (updateTag[0] === 0) {
      return res.status(404).json({ msg: "no tag found!" });
    }

    return res.json(updateTag);
    } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try{
    const deleteTag = await Tag.destroy(
      {where:{id:req.params.id}}
    );
    if (deleteTag === 0) {
      return res.status(404).json({ msg: "no tag found!" });
    };
    return res.json(deleteTag);
    }catch(err){
      return res.status(500).json({err:err.message});
    }
});

module.exports = router;
