var cy = cytoscape({

    container: document.getElementById('cy'),// container to render in

    zoom: 1.5,
    // wheelSensitivity: 0.2,
  
    style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          'background-color': '#666',
          'label': 'data(id)'
          /*'border-style': 'double',
          'border-width': '2px',
          'border-color': 'black',
          'background-image': ['/images/right_arrow.png'],
          'background-width': '60%',
          'background-height': '70%'*/
        }
      },
  
      {
        selector: 'edge',
        style: {
          'width': 3,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
          'label': 'data(label)',
          'font-size': '20px',
          'color': '#777'
        }
      }
    ],
  
    layout: {
      name: 'grid',
      rows: 1
    }
  
  });