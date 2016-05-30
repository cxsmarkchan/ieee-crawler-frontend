/**
 * Created by chenxs on 2016/5/30.
 */

'use strict';

$(async() => {
  let tree = [
    {
      text: '按标记分类',
      nodes: [
        {
          text: '所有未读'
        },
        {
          text: '所有待阅读全文'
        },
        {
          text: '所有重要文章'
        }
      ]
    },
    {
      text: '按期刊分类',
      nodes: []
    }
  ];

  const journals = (await $.get({
    url: '/api/journals'
  })).data;
  let issues = [];

  for (let i = 0; i < journals.length; i++) {
    tree[1].nodes.push({
      text: journals[i].name,
      nodes: []
    });
    issues.push((await $.get({
      url: 'api/issues',
      data: {
        punumber: journals[i].entry_number
      }
    })).data);

    for (let j = 0; j < issues[i].length; j++) {
      if (issues[i][j].status === 0) {
        tree[1].nodes[i].nodes.push({
          text: 'Early Access'
        });
      } else {
        tree[1].nodes[i].nodes.push({
          text: issues[i][j].year + ' Issue ' + issues[i][j].number
        });
      }
    }
  }

  $('#tree').treeview({
    data: tree
  });
});
