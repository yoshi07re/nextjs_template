export default function (plop) {
  plop.setGenerator('component', {
    description: 'create a new component',
    prompts: [
      {
        type: 'input',
        name: 'path',
        message: 'Where is the path to create components? (e.g. components)',
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the component name? (e.g. button)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{path}}/{{name}}/index.tsx',
        templateFile: '.plop/index.tsx.hbs',
        skipIfExists: true,
      },
    ],
  });
}
