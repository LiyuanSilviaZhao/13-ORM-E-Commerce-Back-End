const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findAll({
      include: Product,
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: Product,
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    const category = categoryData.get({plain:true});

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try {
    const categoryCreate = await Category.create(req.body);
    res.status(200).json(categoryCreate);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = Category.update(
      req.body,
      {where:{id:req.params.id}}
    );
    if (updateCategory[0] === 0) {
      return res.status(404).json({ msg: "no category found!" });
    }

    return res.json(updateCategory);
    } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try{
    const deleteCategory = await Category.destroy(
      {where:{id:req.params.id}}
    );
    if (deleteCategory === 0) {
      return res.status(404).json({ msg: "no category found!" });
    };
    return res.json(deleteCategory);
    }catch(err){
      return res.status(500).json({err:err.message});
    }
});

module.exports = router;
