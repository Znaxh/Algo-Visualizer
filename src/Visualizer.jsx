import React, { Component } from "react";
// import TextLoop from "react-text-loop"mport PathFindingVisualizer from './PathFindingVisualizer/PathFindingVisualizer';
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer";
import "./Visualizer.css";
import { CgGitFork } from "react-icons/cg";
import { AiFillStar } from "react-icons/ai";
// import AIVisualizer from './AIVisualizer/AIVisualizer';

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "main",
      rendering: false,
      algorithms: [],
      currentAlgorithm: null,
      goFunction: () => {},
      resetFunction: () => {},
      setAlgorithm: () => {},
      sortingClicked: false,
      pathClicked: false,
      AIClicked: false,
      aicount: 0,
    };
    this.getFunctions = this.getFunctions.bind(this);
    this.changeRenderingState = this.changeRenderingState.bind(this);
  }

  changeRenderingState(rendering) {
    this.setState({ rendering: rendering });
  }

  getFunctions(go, reset, setAlgo, algorithms) {
    this.state.goFunction = go;
    this.state.resetFunction = reset;
    this.state.setAlgorithm = setAlgo;
    this.state.algorithms = algorithms;
    this.setState({ algorithms: algorithms });
  }

  render() {
    let renderObj = null;
    // if (this.state.mode === "pathfinding") {
    //   renderObj = (
    //     <PathFindingVisualizer
    //       setVisualizerRendering={this.changeRenderingState}
    //       getFunctions={this.getFunctions}
    //     />
    //   );}
     if (this.state.mode === "sorting") {
      renderObj = (
        <SortingVisualizer
          setVisualizerRendering={this.changeRenderingState}
          getFunctions={this.getFunctions}
        />
      );
    }
    // else if (this.state.mode === 'ai') {
    //     renderObj = <AIVisualizer count={this.state.aicount} setVisualizerRendering={this.changeRenderingState} getFunctions={this.getFunctions}></AIVisualizer>
    // }
    else {
      renderObj = (
        <div className="welbotron">
          <div className="container welc">
            <h1 className="welcome">
              AlgoVisual
              <p className="quote">
                {/* <TextLoop interval={3800} springConfig={{ stiffness: 200 }} adjustingSpeed={300} >
                                    <p className="quoteText">"An algorithm must be seen to be believed."</p>
                                    <p className="quoteText">"Algorithms are central objects of study in Computer Science."</p>
                                    <p className="quoteText">"Algorithms are apprehensible magics."</p>
                                    <p className="quoteText">"An algorithm is like a recipe."</p>
                                </TextLoop> */}
              </p>
              <p className="lead">Get Better Understanding Of Algorithms </p>
            </h1>
            {/* <a href='#' className='mainpage-b' onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'pathfinding' });
                                this.setState({ currentAlgorithm: null, pathClicked: true });
                            }
                        }} data-toggle={this.state.pathClicked ? "" : "modal"} data-target="#pathIntroModal">
                            <span></span>
                            PATH FINDING
                        </a>
                        <a href='#' className='mainpage-b' onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'sorting', currentAlgorithm: null, sortingClicked: true });
                            }
                        }} data-toggle={this.state.sortingClicked ? "" : "modal"} data-target="#sortingIntroModal">
                            <span></span>
                            SORTING
                        </a>
                        <a href='#' className='mainpage-b' onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'ai', currentAlgorithm: null, AIClicked: true });
                            }
                        }} data-toggle={this.state.AIClicked ? "" : "modal"} data-target="#aiIntroModal">
                            <span></span>
                            ARTIFICIAL INTELLIGENCE
                        </a> */}
          </div>
        </div>
      );
    }

    let invisibleOrNot = "";
    if (this.state.mode === "main") invisibleOrNot = " invisible";
    let algorithms = this.state.algorithms;
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-dark" >
          <button
            onClick={() => {
              if (!this.state.rendering) {
                this.setState({ mode: "main" });
              }
            }}
            type="button"
            className="btn btn-dark navbtn"
            disabled={this.state.rendering}
          >
            Main
          </button>

          <button
            onClick={() => {
              if (!this.state.rendering) {
                this.setState({
                  mode: "pathfinding",
                  currentAlgorithm: null,
                  pathClicked: true,
                });
                this.state.setAlgorithm(-1);
              }
            }}
            type="button"
            className="btn btn-dark navbtn"
            data-toggle={this.state.pathClicked ? "" : "modal"}
            data-target="#pathIntroModal"
            disabled={this.state.rendering}
          >
            Pathfinding
          </button>

          <button
            onClick={() => {
              if (!this.state.rendering) {
                this.setState({
                  mode: "sorting",
                  currentAlgorithm: null,
                  sortingClicked: true,
                });
                this.state.setAlgorithm(-1);
              }
            }}
            type="button"
            className="btn btn-dark navbtn"
            data-toggle={this.state.sortingClicked ? "" : "modal"}
            data-target="#sortingIntroModal"
            disabled={this.state.rendering}
          >
            Sorting
          </button>

          <button
            onClick={() => {
              if (!this.state.rendering) {
                this.setState({
                  mode: "ai",
                  currentAlgorithm: null,
                  AIClicked: true,
                });
                this.state.setAlgorithm(-1);
              }
            }}
            type="button"
            className="btn btn-dark navbtn"
            data-toggle={this.state.AIClicked ? "" : "modal"}
            data-target="#aiIntroModal"
            disabled={this.state.rendering}
          >
            AI
          </button>

          <div className={"dropdown" + invisibleOrNot}>
            <button
              className="btn btn-secondary dropdown-toggle navbtn"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              disabled={this.state.rendering}
            >
              {this.state.currentAlgorithm == null
                ? "Algorithms"
                : this.state.currentAlgorithm}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                {algorithms.map((algorithm, algoId) => {
                  return (
                    <button
                      type="button"
                      className="btn btn-light navbtn"
                      onClick={() => {
                        this.state.setAlgorithm(algoId);
                        this.setState({
                          currentAlgorithm: this.state.algorithms[algoId],
                        });
                      }}
                    >
                      {algorithm}
                    </button>
                  );
                })}
              </li>
            </div>
          </div>

          <div className={"dropdown" + invisibleOrNot}>
              <button
                type="button"
                className="btn btn-secondary navbtn"
                onClick={() => this.state.goFunction()}
                data-toggle={
                  this.state.currentAlgorithm === null ? "modal" : ""
                }
                data-target="#setAlgoModal"
                disabled={
                  this.state.mode === "ai" &&
                  this.state.currentAlgorithm === "Minimax"
                }
              >
                Go!
              </button>
            </div>
            <div className={"dropdown" + invisibleOrNot}>
              <button
                type="button"
                className="btn btn-secondary navbtn"
                onClick={() => this.state.resetFunction()}
              >
                Reset
              </button>
          
          </div>

          <a
            href="https://github.com/Znaxh/Algo-Visualizer"
            style={{ marginLeft: "32%" }}
          >
            <button type="button" className="githubimg" onClick={()=>{ window.open("https://github.com/Znaxh/Algo-Visualizer", "_blank")}}>
              <CgGitFork />
              <AiFillStar />
            </button>
          </a>
        </nav>

        <div className="modal fade" id="setAlgoModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">No Algorithm Selected</h5>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body-alert">
                <p>Please select an algorithm first.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-dark"
                  data-dismiss="modal"
                  style={{ width: "100px" }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="pathIntroModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content intro">
              <div className="modal-header">
                <h5 className="modal-title">Pathfinding</h5>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body intro">
                <span>
                  Pathfinding is generally the process of finding a route
                  between two points. It is closely related to the shortest path
                  problem in graph theory, which examines how to identify the
                  "best" paths valued by different criteria (Ex. distance, cost,
                  time consumption).
                </span>
                <span>
                  Pathfinding is also similar to Searching in some
                  circumstances. For instance, we can use [breadth-first search]
                  to find the shortest path in a grid world.
                </span>
                <span>
                  In our scenario, the paths are valued by the number of cells
                  they passed from START:
                  <div className="simg" width="20" height="20"></div>
                  to the TARGET:
                  <div className="fimg" width="20" height="20"></div>.
                </span>
                <span>
                  You may drag the START and TARGET icons to change their
                  positions, and click on the blank nodes to add Walls.
                </span>

                <span>
                  Now please choose a sorting algorithm and visualize it!
                </span>
                <span className="tips">
                  (after choosing an algorithm, click on the [Actions] button.)
                </span>
                <br />
                <span className="tips">
                  Note: there could be multiple "best" paths, so paths generated
                  by different algorithms may not be consistent.
                </span>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-dark"
                  data-dismiss="modal"
                  style={{ width: "100px" }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="sortingIntroModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content intro">
              <div className="modal-header">
                <h5 className="modal-title">Sorting</h5>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body intro">
                <span>
                  Sorting is a process of arranging an ordered sequence. It is a
                  common operation in many applications.
                </span>
                <span>
                  Common uses of sorted sequences are:
                  <div className="uses-list">
                    <span>·lookup or search efficiently</span>
                    <span>·merge sequences efficiently</span>
                    <span>·process data in a defined order</span>
                  </div>
                  an Now please choose a sorting algorithm and visualize it!
                </span>
                <span className="tips">
                  (after choosing an algorithm, click on the [Actions] button.)
                </span>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-dark"
                  data-dismiss="modal"
                  style={{ width: "100px" }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="aiIntroModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content intro">
              <div className="modal-header">
                <h5 className="modal-title">Artificial Intelligence</h5>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body intro">
                <span>
                  Artificial intelligence (AI) is intelligence demonstrated by
                  machines. Leading textbooks define the field as the study of
                  "intelligent agents": any device that perceives its
                  environment and takes actions that maximize its chance of
                  successfully achieving its goals.
                </span>
                <span>
                  In this category, you will experience with powerful AI
                  algorithms based on fundamental ideas. Please try to
                  understand those ideas behind through the visualizations, and
                  I would try my best to demonstrate those principles.
                </span>
                <span>
                  {" "}
                  Now please choose an algorithm and begin your journey!
                </span>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-dark"
                  data-dismiss="modal"
                  style={{ width: "100px" }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>{renderObj}</div>
      </>
    );
  }
}
