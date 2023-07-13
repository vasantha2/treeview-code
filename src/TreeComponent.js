// import React, { useState, useCallback, useMemo } from "react";
// import { VariableSizeList as List } from "react-window";
// import AutoSizer from "react-virtualized-auto-sizer";
// import TreeView from "@material-ui/lab/TreeView";
// import TreeItem from "@material-ui/lab/TreeItem";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import HeightIcon from "@material-ui/icons/Height";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles({
//   list: {
//     height: "100%",
//     overflow: "auto",
//   },
// });

// const MemoizedTreeView = React.memo(TreeView);
// const MemoizedTreeItem = React.memo(TreeItem);

// const TreeComponent = ({ data }) => {
//   const classes = useStyles();
//   const [expanded, setExpanded] = useState([]);

//   const buildTree = useCallback((items, parentId = null) => {
//     const nodes = items.filter((item) => item.parentId === parentId);

//     return nodes.map((node) => ({
//       ...node,
//       children: buildTree(items, node.id),
//     }));
//   }, []);

//   const treeData = useMemo(() => buildTree(data), [buildTree, data]);

//   const renderTree = useMemo(() => {
//     const render = (nodes, expanded, setExpanded) => (
//       <MemoizedTreeView
//         defaultCollapseIcon={<ExpandMoreIcon />}
//         defaultExpandIcon={<ChevronRightIcon />}
//         expanded={expanded}
//         onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
//       >
//         {nodes.map((node) => {
//           const { id, label, children } = node;

//           return (
//             <MemoizedTreeItem key={id} nodeId={id} label={label}>
//               {children && children.length > 0
//                 ? render(children, expanded, setExpanded)
//                 : null}
//             </MemoizedTreeItem>
//           );
//         })}
//       </MemoizedTreeView>
//     );

//     return render;
//   }, []);

//   const expandAllNodes = useCallback(() => {
//     const allNodeIds = treeData.map((node) => node.id);
//     setExpanded(allNodeIds);
//   }, [treeData]);

//   const collapseAllNodes = useCallback(() => {
//     setExpanded([]);
//   }, []);

//   const itemSizes = useMemo(() => {
//     const sizes = treeData.map(() => 600);
//     return sizes;
//   }, [treeData]);

//   const rowRenderer = ({ index, style }) => {
//     const item = treeData[index];

//     return (
//       <div style={style}>
//         <MemoizedTreeView
//           defaultCollapseIcon={<ExpandMoreIcon />}
//           defaultExpandIcon={<ChevronRightIcon />}
//           expanded={expanded}
//           onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
//         >
//           {renderTree([item], expanded, setExpanded)}
//         </MemoizedTreeView>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <button onClick={expandAllNodes}>
//         <HeightIcon />
//       </button>
//       <button onClick={collapseAllNodes}>Collapse All</button>
//       <AutoSizer>
//         {({ height, width }) => (
//           <List
//             className={classes.list}
//             height={height}
//             itemCount={treeData.length}
//             itemSize={(index) => itemSizes[index]}
//             width={width}
//           >
//             {rowRenderer}
//           </List>
//         )}
//       </AutoSizer>
//     </div>
//   );
// };

// export default TreeComponent;

import React, { useState, useCallback, useMemo } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HeightIcon from "@material-ui/icons/Height";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  list: {
    height: "100%",
    overflow: "auto",
  },
});

const MemoizedTreeView = React.memo(TreeView);
const MemoizedTreeItem = React.memo(TreeItem);

const TreeComponent = ({ data }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState([]);

  const buildTree = useCallback((items, parentId = null) => {
    const nodes = items.filter((item) => item.parentId === parentId);

    return nodes.map((node) => ({
      ...node,
      children: buildTree(items, node.id),
    }));
  }, []);

  const treeData = useMemo(() => buildTree(data), [data]);

  const renderTree = useMemo(() => {
    const render = (nodes, expanded, setExpanded) => (
      <MemoizedTreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
      >
        {nodes.map((node) => {
          const { id, label, children } = node;

          return (
            <MemoizedTreeItem key={id} nodeId={id} label={label}>
              {children && children.length > 0
                ? render(children, expanded, setExpanded)
                : null}
            </MemoizedTreeItem>
          );
        })}
      </MemoizedTreeView>
    );

    return render;
  }, [expanded, setExpanded]);

  const expandAllNodes = useCallback(() => {
    const allNodeIds = treeData.map((node) => node.id);
    setExpanded(allNodeIds);
  }, [treeData]);

  const collapseAllNodes = useCallback(() => {
    setExpanded([]);
  }, []);

  const itemSizes = useMemo(() => {
    const sizes = treeData.map(() => 600);
    return sizes;
  }, [treeData]);

  const rowRenderer = useCallback(
    ({ index, style }) => {
      const item = treeData[index];

      return (
        <div style={style}>
          <MemoizedTreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expanded}
            onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
          >
            {renderTree([item], expanded, setExpanded)}
          </MemoizedTreeView>
        </div>
      );
    },
    [expanded, treeData, renderTree]
  );

  return (
    <div>
      <button onClick={expandAllNodes}>
        <HeightIcon />
      </button>
      <button onClick={collapseAllNodes}>Collapse All</button>
      <AutoSizer>
        {({ height, width }) => (
          <List
            className={classes.list}
            height={height}
            itemCount={treeData.length}
            itemSize={(index) => itemSizes[index]}
            width={width}
          >
            {rowRenderer}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default TreeComponent;
