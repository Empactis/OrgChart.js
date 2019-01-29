import OrgChart from '../js/orgchart.min.js';

document.addEventListener('DOMContentLoaded', function () {

  let datascource = [{
      'name': 'Lao Lao',
      'title': 'general manager',
      'children': [{
          'name': 'Bo Miao',
          'title': 'department manager'
        },
        {
          'name': 'Su Miao',
          'title': 'department manager',
          'children': [{
              'name': 'Tie Hua',
              'title': 'senior engineer'
            },
            {
              'name': 'Hei Hei',
              'title': 'senior engineer'
            }
          ]
        },
        {
          'name': 'Hong Miao',
          'title': 'department manager'
        },
        {
          'name': 'Chun Miao',
          'title': 'department manager'
        }, {
          'name': 'Hong Miao',
          'title': 'department manager'
        }, {
          'name': 'Chun Miao',
          'title': 'department manager'
        }, {
          'name': 'Hong Miao',
          'title': 'department manager'
        }, {
          'name': 'Chun Miao',
          'title': 'department manager'
        }
      ]
    },
    {
      'name': 'Lao Lao',
      'title': 'general manager',
      'children': [{
          'name': 'Bo Miao',
          'title': 'department manager'
        },
        {
          'name': 'Su Miao',
          'title': 'department manager',
          'children': [{
              'name': 'Tie Hua',
              'title': 'senior engineer'
            },
            {
              'name': 'Hei Hei',
              'title': 'senior engineer'
            }
          ]
        },
        {
          'name': 'Hong Miao',
          'title': 'department manager'
        },
        {
          'name': 'Chun Miao',
          'title': 'department manager'
        }
      ]
    }
  ]
  datascource.forEach((item, index) => {
    const newElement = document.createElement('div');
    const id = `chart-container-${index}`;
    newElement.setAttribute('id', id)
    document.getElementsByTagName('body')[0].appendChild(newElement);
    new OrgChart({
      'chartContainer': `#${id}`,
      'data': item,
      'nodeContent': 'title',
      'direction': 'l2r'
    })
  })


});