import OrgChart from '../js/orgchart.min.js';

function closest(el, fn) {
  return el && ((fn(el) && el !== document.querySelector('.orgchart')) ? el : closest(el.parentNode, fn));
}

function addClass(elements, classNames) {
  elements.forEach((el) => {
    if (classNames.includes(' ')) {
      classNames.split(' ').forEach((className) => el.classList.add(className));
    } else {
      el.classList.add(classNames);
    }
  });
}

function removeClass(elements, classNames) {
  elements.forEach((el) => {
    if (classNames.includes(' ')) {
      classNames.split(' ').forEach((className) => el.classList.remove(className));
    } else {
      el.classList.remove(classNames);
    }
  });
}

function bindEventHandler(selector, type, fn, parentSelector) {
  if (parentSelector) {
    document.querySelector(parentSelector).addEventListener(type, function (event) {
      if ((event.target.classList && event.target.classList.contains(selector.slice(1))) ||
        closest(event.target, el => el.classList && el.classList.contains(selector.slice(1)))) {
        fn(event);
      }
    });
  } else {
    document.querySelectorAll(selector).forEach(element => {
      element.addEventListener(type, fn);
    });
  }
}

function clickNode(event) {
  let sNode = closest(event.target, el => el.classList && el.classList.contains('node')),
    sNodeInput = document.getElementById('selected-node');

  sNodeInput.value = sNode.querySelector('.title').textContent;
  sNodeInput.dataset.node = sNode.id;
}

function clickChart(event) {
  if (!closest(event.target, el => el.classList && el.classList.contains('node'))) {
    document.getElementById('selected-node').textContent = '';
  }
}

function toggleViewState() {
  let chart = document.querySelector('.orgchart');
  chart.classList.toggle('view-state', this.value !== 'view');
  document.getElementById('edit-panel').classList.toggle('view-state', this.value === 'view');
  if (this.value === 'edit') {
    removeClass(Array.from(chart.querySelectorAll('tr')), 'hidden');
    removeClass(Array.from(chart.querySelectorAll('td')), 'hidden');
    removeClass(Array.from(chart.querySelectorAll('.node')), 'slide-up slide-down slide-right slide-left');
  } else {
    document.getElementById('btn-reset').click();
  }
}

function toggleNodeType() {
  if (this.value === 'parent') {
    document.getElementById('edit-panel').classList.add('edit-parent-node');
    Array.from(document.getElementById('new-nodelist').children)
      .slice(1).forEach(newNode => newNode.remove());
  } else {
    document.getElementById('edit-panel').classList.remove('edit-parent-node');
  }
}

function addNodes(orgchart) {
  let chartContainer = document.getElementById('chart-container'),
    nodeVals = [];

  Array.from(document.getElementById('new-nodelist').querySelectorAll('.new-node'))
    .forEach(item => {
      let validVal = item.value.trim();

      if (validVal) {
        nodeVals.push(validVal);
      }
    });
  let selectedNode = document.getElementById(document.getElementById('selected-node').dataset.node);

  if (!nodeVals.length) {
    alert('Please input value for new node');
    return;
  }
  let nodeType = document.querySelector('input[name="node-type"]:checked');

  if (!nodeType) {
    alert('Please select a node type');
    return;
  }
  if (nodeType.value !== 'parent' && !document.querySelector('.orgchart')) {
    alert('Please creat the root node firstly when you want to build up the orgchart from the scratch');
    return;
  }
  if (nodeType.value !== 'parent' && !selectedNode) {
    alert('Please select one node in orgchart');
    return;
  }
  let hasChild = selectedNode.parentNode.colSpan > 1;

  if (!hasChild) {
    let rel = nodeVals.length > 1 ? '110' : '100';

    orgchart.addChildren(selectedNode, {
      'children': nodeVals.map(item => {
        return {
          'name': item,
          'relationship': rel,
          'Id': getId()
        };
      })
    });
  } else {
    orgchart.addSiblings(closest(selectedNode, el => el.nodeName === 'TABLE').querySelector('.nodes').querySelector('.node'), {
      'siblings': nodeVals.map(function (item) {
        return {
          'name': item,
          'relationship': '110',
          'Id': getId()
        };
      })
    });
  }
}

function getId() {
  return (new Date().getTime()) * 1000 + Math.floor(Math.random() * 1001);
}

document.addEventListener('DOMContentLoaded', function () {
  let orgchart,
    datascource = {
      'name': 'Ball game',
      'children': [{
          'name': 'Football'
        },
        {
          'name': 'Basketball'
        },
        {
          'name': 'Volleyball'
        }
      ]
    };

  orgchart = new OrgChart({
    'chartContainer': '#chart-container',
    'data': datascource,
    'exportButton': true,
    'exportFilename': 'SportsChart',
    'parentNodeSymbol': 'fa-th-large',
    'createNode': function (node, data) {
      node.id = getId();
    }
  });

  bindEventHandler('.node', 'click', clickNode, '#chart-container');
  bindEventHandler('.orgchart', 'click', clickChart, '#chart-container');
  bindEventHandler('input[name="chart-state"]', 'click', toggleViewState);
  bindEventHandler('input[name="node-type"]', 'click', toggleNodeType);
  document.getElementById('btn-add-nodes').addEventListener('click', () => addNodes(orgchart));

});