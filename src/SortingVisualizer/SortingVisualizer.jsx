import React, { Component } from "react";
import "./SortingVisualizer.css";
import Pile from "./Pile/Pile";
import {
  selectionSort,
  bubbleSort,
  insertionSort,
  mergeSort,
  quickSort,
} from "../Algorithm/sortingAlgorithms";
import "bootstrap/dist/css/bootstrap.min.css";
import Codes from "./CodeDisplay/CodeDisplay";

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      piles: [],
      numPiles: 30,
      finished: false,
      maxPile: 80,
      changingPiles: [],
      pileDelayTimes: [30, 40, 40, 80, 80],
      DelayTimesSizeBased: {
        fast: [15, 20, 20, 40, 40],
        medium: [30, 40, 40, 80, 80],
        slow: [60, 80, 80, 160, 160],
      },
      colorSetIndex: getRandomInt(0, 3),
      currentAlgorithm: -1,
      descriptions: [
        "Selection Sort: repeatedly find the minimum element from the unsorted part and append it to the sorted part.",
        "Bubble Sort: compares each pair of adjacent elements in the list from the beginning to the end. If the elements are in the wrong order, they are swapped",
        "Insertion Sort: repeatedly place value from the unsorted part at the correct position in the sorted part(by finding the closest left-side element that is smaller than it).",
        "Merge Sort: divide the array into two halves, sort them recursively using merge sort, and then merge the two halves.",
        "Quick Sort: choose an element as pivot, arrange the array such that the elements smaller than pivot are on its left and others are on its right, sort the two halves recursively.",
      ],
      unsortedPiles: [],
      speed: "medium",
      size: "medium",
      algorithms: [
        "Selection Sort",
        "Bubble Sort",
        "Insertion Sort",
        "Merge Sort",
        "Quick Sort",
      ],
      sortingAlgorithms: [
        selectionSort,
        bubbleSort,
        insertionSort,
        mergeSort,
        quickSort,
      ],
    };
    this.randomizePiles = this.randomizePiles.bind(this);
    this.visualizeSorting = this.visualizeSorting.bind(this);
    this.setAlgorithm = this.setAlgorithm.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
    this.setSize = this.setSize.bind(this);
    this.props.getFunctions(
      this.visualizeSorting,
      this.randomizePiles,
      this.setAlgorithm,
      this.state.algorithms
    );
  }

  componentDidMount() {
    const piles = this.initializePiles();
    this.setState({
      piles: piles,
    });
    this.setState({ piles: piles, unsortedPiles: piles.slice() });
  }

  setAlgorithm(algoId) {
    if (this.state.unsortedPiles.length > 0) {
      this.setState({
        finished: false,
        changingPiles: [],
        piles: this.state.unsortedPiles,
        pivot: -1,
      });
    }
    this.setState({ currentAlgorithm: algoId });
  }

  initializePiles() {
    let piles = [];
    for (let i = 0; i < this.state.numPiles; i++) {
      piles.push(i + 5);
    }

    for (let i = 0; i < this.state.numPiles; i++) {
      let j = getRandomInt(0, i);
      let temp = piles[i];
      piles[i] = piles[j];
      piles[j] = temp;
    }
    piles.push(this.state.numPiles + 5);
    return piles;
  }

  visualizeSorting() {
    if (this.state.currentAlgorithm === -1) {
      return;
    }
    if (this.state.rendering) return;
    if (this.state.finished) {
      this.state.finished = false;
      this.state.changingPiles = [];
      this.state.piles = this.state.unsortedPiles;
    }
    this.setState({ rendering: true });
    this.props.setVisualizerRendering(true);
    const piles = this.state.piles.slice();

    const statesInOrder =
      this.state.sortingAlgorithms[this.state.currentAlgorithm](piles);
    for (let i = 0; i < statesInOrder.length; i++) {
      const { piles: state, changing: changingPiles, pivot } = statesInOrder[i];
      setTimeout(() => {
        this.setState({
          piles: state,
          changingPiles: changingPiles,
          pivot: pivot,
        });
      }, this.state.pileDelayTimes[this.state.currentAlgorithm] * i);
    }
    setTimeout(() => {
      this.setState({ rendering: false, finished: true });
      this.props.setVisualizerRendering(false);
    }, this.state.pileDelayTimes[this.state.currentAlgorithm] * statesInOrder.length);
  }

  randomizePiles() {
    if (this.state.rendering) return;
    this.setState({
      finished: false,
      changingPiles: [],
      colorSetIndex: getRandomInt(0, 3),
    });
    const piles = this.initializePiles();
    this.setState({ piles: piles, unsortedPiles: piles.slice() });
  }

  setSpeed(speed) {
    this.setState({
      speed: speed,
      pileDelayTimes: this.state.DelayTimesSizeBased[speed],
    });
  }

  setSize(s) {
    if (this.state.size === s) return;
    let sizes = { small: 20, medium: 30, large: 40 };
    this.setState({ size: s, numPiles: sizes[s] });
    this.state.numPiles = sizes[s];
    const piles = this.initializePiles();
    this.setState({
      finished: false,
      changingPiles: [],
      piles: piles,
      unsortedPiles: piles.slice(),
    });
  }

  render() {
    const piles = this.state.piles;
    let nSquare = <p>Time Complexity: θ(n&#178;)</p>;
    let nLogn = <p>Time Complexity: θ(n·log(n))</p>;
    return (
      <>
        <div className="piles container">
          {piles.map((pile, pileId) => {
            return (
              <Pile
                dummy={pileId === this.state.numPiles}
                finished={this.state.finished}
                className="pile"
                key={pileId}
                index={pileId}
                val={pile}
                size={this.state.size}
                isChanging={this.state.changingPiles.indexOf(pileId) !== -1}
                isPivot={this.state.pivot === pile}
                colorSetIndex={this.state.colorSetIndex}
              ></Pile>
            );
          })}
        </div>

        <div
          className="d-flex"
          style={{ marginLeft: "37%", marginTop: "10px" }}
        >
          <div className="dropdown 1">
            <button
              className="btn btn-dark dropdown-toggle"
              type="button"
              disabled={this.state.rendering}
              id="dropdownMenuSpeed"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ marginRight: "5px", height: "30px", width: "150px" }}
            >
              <p
                style={{ marginTop: "-5px" }}
              >{`Speed: ${this.state.speed}`}</p>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuSpeed">
              <li key="slow">
                <button
                  type="button"
                  className="btn btn-light navbtn"
                  style={{ height: "30px" }}
                  onClick={() => this.setSpeed("slow")}
                >
                  <p style={{ marginTop: "-5px" }}>{`slow`}</p>
                </button>
              </li>
              <li key="medium">
                <button
                  type="button"
                  className="btn btn-light navbtn"
                  style={{ height: "30px" }}
                  onClick={() => this.setSpeed("medium")}
                >
                  <p style={{ marginTop: "-5px" }}>{`medium`}</p>
                </button>
              </li>
              <li key="fast">
                <button
                  type="button"
                  className="btn btn-light navbtn"
                  style={{ height: "30px" }}
                  onClick={() => this.setSpeed("fast")}
                >
                  <p style={{ marginTop: "-5px" }}>{`fast`}</p>
                </button>
              </li>
            </div>
          </div>
          <div className="dropdown show">
            <button
              className="btn btn-dark dropdown-toggle"
              type="button"
              disabled={this.state.rendering}
              id="dropdownMenuSize"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ marginLeft: "5px", height: "30px", width: "150px" }}
            >
              <p style={{ marginTop: "-5px" }}>{`Size: ${this.state.size}`}</p>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuSize">
              <li key="small">
                <button
                  type="button"
                  className="btn btn-light navbtn"
                  style={{ height: "30px" }}
                  onClick={() => this.setSize("small")}
                >
                  <p style={{ marginTop: "-5px" }}>{`small`}</p>
                </button>
              </li>
              <li key="medium">
                <button
                  type="button"
                  className="btn btn-light navbtn"
                  style={{ height: "30px" }}
                  onClick={() => this.setSize("medium")}
                >
                  <p style={{ marginTop: "-5px" }}>{`medium`}</p>
                </button>
              </li>
              <li key="large">
                <button
                  type="button"
                  className="btn btn-light navbtn"
                  style={{ height: "30px" }}
                  onClick={() => this.setSize("large")}
                >
                  <p style={{ marginTop: "-5px" }}>{`large`}</p>
                </button>
              </li>
            </div>
          </div>
        </div>

        <h6 className="algoDescription">
          {this.state.currentAlgorithm === -1
            ? "Select an algorithm first. To get started"
            : this.state.descriptions[this.state.currentAlgorithm]}
            
        </h6>
        <h5
          className="algoComplexity"
          style={{ marginTop: "-4.5%", color: "rgb(10,10,10)" }}
        >
          {this.state.currentAlgorithm === -1
            ? ""
            : this.state.currentAlgorithm < 3
            ? nSquare
            : nLogn}
        </h5>
        <div>{this.state.currentAlgorithm === -1 ? "" : <Codes index={this.state.currentAlgorithm} />}</div>
      </>
    );
  }
}

function getRandomInt(min, range) {
  return Math.floor(Math.random() * range) + min;
}
