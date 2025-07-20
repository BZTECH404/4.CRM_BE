const Correspondence = require('../models/correspondence');
const mongoose = require('mongoose');

// Create a new correspondence
const createCorrespondence = async (req, res) => {
  try {

    //////console.log(req.body)

    const correspondence = new Correspondence(req.body)

    const newCorrespondence = await correspondence.save();
    res.status(201).json({ newCorrespondence });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllCorrespondences = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search = "",
      type,
      cstatus,
      from,
      date="",
      to,
      projectId,
      forwarded,
      acknowledgement,
      isDisabled
    } = req.query;
    // consol
    const filter = { isDisabled: isDisabled?isDisabled=='true'?true:false:false };
    // console.log(req.query)
    // Full-text search on key fields
    if (search) {
      filter.$or = [
        { subject: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { letterno: { $regex: search, $options: "i" } },
        // { from: { $regex: search, $options: "i" } },
        // { to: { $regex: search, $options: "i" } },

      ];
    }
// Strict match on 'date' (string match, as your schema has date as string)
  if (date) {
      filter.date = { $regex: `^${date}`, $options: "i" };
    }
    if (type) filter.type = type;
    if (projectId) filter.project = projectId;
    if (forwarded) filter.forwarded=forwarded;
    if (acknowledgement) filter.acknowledgement = acknowledgement;
    if (from) filter.from = from;
    if (to) filter.to = to;
    

    const total = await Correspondence.countDocuments(filter);

    const correspondences = await Correspondence.find(filter)
      // .populate("project", "name") // adjust if you want more fields from project
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ creationdate: -1 }); // latest first

    res.json({
      data: correspondences,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
    // console.log(correspondences)
  } catch (err) {
    console.error("Error in getAllCorrespondences:", err);
    res.status(500).json({ message: err.message });
  }
};
// // Get all correspondences
// const getAllCorrespondences = async (req, res) => {
//   try {
//     const correspondences = await Correspondence.find();
//     console.log()
//     res.json(correspondences);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



const getLinkedCorrespondences = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Get the main correspondence
    const main = await Correspondence.findById(id);
    if (!main) return res.status(404).json({ message: "Correspondence not found" });

    // 2. Build a filter from its reference arrays
    const refValues = [
      ...(main.reffrom || []),
      ...(main.refto || []),
      ...(main.enclosedfrom || []),
      ...(main.enclosedto || []),
      ...(main.replyto || []),
      ...(main.replyfrom || [])
    ].filter(Boolean); // remove any undefined/null/empty

    if (refValues.length === 0) {
      return res.json([]); // no links
    }
    // console.log(refValues)

    // 3. Query for all other correspondences that match any of those values in the same fields
    let linkedCorrespondences=[]
    for(let i=0;i<refValues.length;i++){
      let temp=await Correspondence.find({_id:refValues[i]})
        linkedCorrespondences.push(temp[0])
    }

    // console.log(linkedCorrespondences)

    res.json(linkedCorrespondences);
  } catch (err) {
    console.error("Error in getLinkedCorrespondences:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get a single correspondence by ID
const getCorrespondenceById = async (req, res) => {
  try {
    const correspondence = await Correspondence.findById(req.params.id);
    if (!correspondence) {
      return res.status(404).json({ message: 'Correspondence not found' });
    }
    res.json(correspondence);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// 
// const ifAcknowledgementexists=async()=>{
//   const correspondence = await Correspondence.find();
//   for(let i=0;i<correspondence.length;i++){
//     for(let j=0;j<correspondence[i].files1.length;j++){
//       if(correspondence[i].files1[j]==undefined){
//       // console.log("here")
//       await Correspondence.findByIdAndUpdate(correspondence[i]._id,{acknowledgement:"Not Recieved"},{new:true})

//     }
//     else{

//       await Correspondence.findByIdAndUpdate(correspondence[i]._id,{acknowledgement:"Uploaded"},{new:true})

//       // }
//     }
//   }
// }
// }

// const ifnoactionrequired=async ()=>{
//   const correspondence = await Correspondence.find();
//   for(let i=0;i<correspondence.length;i++){
//     await Correspondence.findByIdAndUpdate(correspondence[i]._id,{forwarded:"Action Pending"},{new:true})
//   }  
// }


// Update a correspondence by ID
const updateCorrespondence = async (req, res) => {
  try {
    let { date, project, description, subject, acknowledgement, letterno, reffrom, refto, enclosedfrom, enclosedto, forwarded, from, to, type, files, files1, cstatus } = req.body;
    const { fileId, newCurrent } = req.body; // assuming fileId is the unique identifier of the file element

    const correspondence = await Correspondence.findById(req.params.id);
    if (acknowledgement == "Uploaded" && (files1.current == "" || files1.current == undefined)) {
      // console.log(acknowledgement,correspondence.acknowledgement,files1.current)
      acknowledgement = correspondence.acknowledgement
    }
    if (!correspondence) {
      return res.status(404).json({ message: 'Correspondence not found' });
    }

    // Update general fields
    if (project !== undefined) correspondence.project = project;
    if (date !== undefined) correspondence.date = date;
    if (description !== undefined) correspondence.description = description;
    if (subject !== undefined) correspondence.subject = subject;
    if (acknowledgement !== undefined) correspondence.acknowledgement = acknowledgement;
    if (letterno !== undefined) correspondence.letterno = letterno;
    if (forwarded !== undefined) correspondence.forwarded = forwarded;
    if (reffrom !== undefined) correspondence.reffrom = reffrom;
    if (refto !== undefined) correspondence.refto = refto;
    if (enclosedfrom !== undefined) correspondence.enclosedfrom = enclosedfrom;
    if (enclosedto !== undefined) correspondence.enclosedto = enclosedto;
    if (type !== undefined) correspondence.type = type;
    if (from !== undefined) correspondence.from = from;
    if (to !== undefined) correspondence.to = to;
    if (cstatus !== undefined) correspondence.cstatus = cstatus

    // If new files are provided, insert them into index 1 and keep the existing order
    // console.log(files)
    if (files !== undefined) {
      // if (correspondence.files && correspondence.files.length > 0) {
      //   correspondence.files = [correspondence.files[0], ...files]; // Keep the first existing file at index 0, add new files to index 1
      // } else {
      correspondence.files = files; // If no existing files, simply add the new files
      // }
    }

    // Similarly, update files1 if necessary
    if (files1 !== undefined) {
      // if (correspondence.files1 && correspondence.files1.length > 0) {
      //   correspondence.files1 = [correspondence.files1[0], ...files1]; // Keep the first existing file at index 0, add new files to index 1
      // } else {
      correspondence.files1 = files1; // If no existing files, simply add the new files
      // }
    }

    // Update the 'current' field inside the specific file
    if (fileId && newCurrent !== undefined) {
      const fileToUpdate = correspondence.files.id(fileId); // Find file by subdocument id
      if (fileToUpdate) {
        fileToUpdate.current = newCurrent; // Update the current field
      } else {
        return res.status(404).json({ message: 'File not found' });
      }
    }

    // Save the updated correspondence
    const updatedCorrespondence = await correspondence.save();
    res.json(updatedCorrespondence);
  } catch (err) {
    //////console.log(err);
    res.status(400).json({ message: err.message });
  }
};



// Delete a correspondence by ID
const deleteCorrespondence = async (req, res) => {
  try {
    const {deletedate}=req.query
    // console.log(deletedate)
    // Fetch the correspondence by its ID
    const correspondence = await Correspondence.findById(req.params.id);

    // Check if the correspondence exists
    if (!correspondence) {
      return res.status(404).json({ message: 'Correspondence not found' });
    }

    // Perform the deletion
    await Correspondence.findByIdAndUpdate(req.params.id, { isDisabled: !correspondence.isDisabled,recoveredDate:deletedate }, { new: true });

    // Respond with success message
    res.status(200).json({ message: 'Correspondence deleted successfully' });
  } catch (err) {
    // Log the error and respond with 500 status if something goes wrong
    ////console.error('Error deleting correspondence:', err.message);
    res.status(500).json({ message: 'Server error while deleting correspondence' });
  }
};

// Create Correspondence History
const createcorrhistory = async (req, res) => {
  try {
    //////console.log(req.body)
    const { description, filename, file } = req.body
    const cid = req.params.id
    //////console.log(cid)
    let correspondences = await Correspondence.findById(cid);
    let fs = correspondences.files
    fs.push({
      description, filename,
      current: file
    })
    await Correspondence.findByIdAndUpdate(cid, correspondences, { new: true });

  }
  catch (err) {
    //////console.log(err)
  }
}

const viewcorrhistory = async (req, res) => {
  try {
    const cid = req.params.id
    let correspondences = await Correspondence.findById(cid);
    //////console.log(correspondences)

  }
  catch (err) {
    //////console.log(err)
  }
}

const updatecorrorder = async (req, res) => {
  try {
    // //////console.log("hi")
    const cid = req.params.id
    let correspondences = await Correspondence.findById(cid);
    correspondences.files = req.body

    await Correspondence.findByIdAndUpdate(cid, correspondences, { new: true })
    res.status(200).json({ message: "success" })
    //////console.log("success")
  } catch (error) {
    //////console.log(error)

  }
}

const AddReference = async (req, res) => {
  try {
    const { refto } = req.body;
    const cid = req.params.id;
    //////console.log(refto)
    // Update the 'refto' field only
    const correspondence = await Correspondence.findByIdAndUpdate(
      cid,
      { refto },
      { new: true }
    );

    // Update the 'reffrom' in referenced documents
    await AddReffromin(refto, cid, "refto");

    res.status(200).json({ message: "success" });
  } catch (error) {
    //////console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const AddReffromin = async (refto, cid, type) => {
  try {
    // Convert cid to string
    const str = cid.toString();

    if (type === "refto") {
      // Addition of New References
      for (let i = 0; i < refto.length; i++) {
        // Convert refto items to string
        const refId = refto[i].toString();
        const correspondence = await Correspondence.findById(refId);
        if (!correspondence) continue;

        // Add the cid to reffrom if it's not already present
        if (!correspondence.reffrom.some(id => id.toString() === str)) {
          correspondence.reffrom.push(str);
          await correspondence.save();
        }
      }
      // const correspondences1 = await Correspondence.find();
      // //////console.log(correspondences1)
      // Removal of earlier references
      const correspondences = await Correspondence.find({ reffrom: str });
      for (let i = 0; i < correspondences.length; i++) {
        const correspondence = correspondences[i];

        // Convert each id in reffrom to string for comparison
        const reffromIds = correspondence.reffrom.map(id => id.toString());

        // Remove cid from reffrom if it's not in the new refto array
        if (!refto.some(id => id.toString() === correspondence._id.toString())) {
          correspondence.reffrom = reffromIds.filter(id => id !== str);
          await correspondence.save();
        }
      }
    }
  } catch (error) {
    //////console.log(error);
  }
};

// Add Reference From
const AddReffrom = async (req, res) => {
  try {
    // //////console.log("hi")
    if (type == "refto") {
      //////console.log()
    }
    const { refto } = req.body
    const cid = req.params.id
    let correspondences = await Correspondence.findById(cid);
    correspondences.refto = refto
    //////console.log(correspondences)
    // correspondences.files=req.body
    // await Correspondence.findByIdAndUpdate(cid,correspondences,{new:true})
    // res.status(200).json({message:"success"})
    // //////console.log("success")
  } catch (error) {
    //////console.log(error)

  }
}

// // Add Reference
// const AddReference = async (req, res) => {
//   try {
//     // //////console.log("hi")
//     const { refto } = req.body
//     const cid = req.params.id
//     let correspondence = await Correspondence.findById(cid);
//     correspondence.refto = refto
//     await Correspondence.findByIdAndUpdate(cid, correspondence, { new: true })
//     AddReffromin(refto, cid, "refto")
//     res.status(200).json({ message: "success" })
//     // //////console.log("success")
//   } catch (error) {
//     //////console.log(error)

//   }
// }

// const AddReffromin = async (ref, cid, type) => {
//   try {
//     const correspondences = await Correspondence.find();
//     // Put all object ids in stirng form
//     let refto = []
//     for (let i = 0; i < ref.length; i++) {
//       refto.push(ref[i].toString())
//     }

//     let str = cid.toString()
//     if (type == "refto") {
//       // Addition of New References
//       for (let i = 0; i < ref.length; i++) {
//         let correspondence = await Correspondence.findById(ref[i]);
//         let reffrom = correspondence.reffrom
//         //////console.log(ref[i],correspondence.refto,reffrom,"two")
//         let flag = false
//         for (let j = 0; j < reffrom.length; j++) {
//           // //////console.log((reffrom[j]._id).toString())
//           if (((reffrom[j]._id).toString()) == str) {
//             flag = true
//           }
//         }
//         // //////console.log(flag)
//         if (flag == false) {
//           reffrom.push(str)
//           //////console.log(str)
//           await Correspondence.findByIdAndUpdate(ref[i], correspondence, { new: true });
//         }
//       }

//       // //////console.log('pushed refrom',cid.toString())

//       // Removal of earlier references
//       for (let i = 0; i < correspondences.length; i++) {
//         let reffrom = correspondences[i].reffrom
//         let length=reffrom.length
//         //////console.log(correspondences[i]._id,reffrom,"198",i)
//         for (let j = 0; j < length; j++) {
//           //////console.log(reffrom[j],i,j,cid)
//           // //////console.log(reffrom[j].toString(), str)
//           if (reffrom[j]._id.toString() == str) {
//             if (refto.includes((correspondences[i]._id).toString())) {
//               //////console.log("hi")

//             }
//             else {
//               //////console.log("where",reffrom[j])
//               reffrom.splice(j, 1)


//             }
//           }
//         }
//         await Correspondence.findByIdAndUpdate(correspondences[i]._id, correspondences[i], { new: true });
//       }
//     }
//   }

//   catch (error) {
//     //////console.log(error)

//   }
// }
// Add Enclosures

const AddEnclosedin = async (enclosedto, cid, type) => {
  try {
    // Convert cid to string
    const str = cid.toString();

    if (type === "enclosedto") {
      // Validate if enclosedto is an array and has elements
      if (!Array.isArray(enclosedto)) {
        throw new Error("enclosedto is not a valid array");
      }

      // Addition of New References
      for (let i = 0; i < enclosedto.length; i++) {
        // Convert enclosedto items to string
        const enclosedId = enclosedto[i].toString();
        const correspondence = await Correspondence.findById(enclosedId);
        if (!correspondence) continue;

        // Add the cid to enclosedfrom if it's not already present
        if (!correspondence.enclosedfrom.some(id => id.toString() === str)) {
          correspondence.enclosedfrom.push(str);
          await correspondence.save();
        }
      }

      // Removal of earlier references
      const correspondences = await Correspondence.find({ enclosedfrom: str });
      for (let i = 0; i < correspondences.length; i++) {
        const correspondence = correspondences[i];

        // Convert each id in enclosedfrom to string for comparison
        const enclosedfromIds = correspondence.enclosedfrom.map(id => id.toString());

        // Remove cid from enclosedfrom if it's not in the new enclosedto array
        if (!enclosedto.some(id => id.toString() === correspondence._id.toString())) {
          correspondence.enclosedfrom = enclosedfromIds.filter(id => id !== str);
          await correspondence.save();
        }
      }
    }
  } catch (error) {
    //////console.log(error);
    throw error;  // Ensure the error is propagated up the stack
  }
};


const AddEnclosures = async (req, res) => {
  try {
    const { enclosedto } = req.body;
    const cid = req.params.id;

    //////console.log("Request Body:", req.body); // Log the request body

    // Validate if enclosedto is provided and is an array
    if (!enclosedto || !Array.isArray(enclosedto)) {
      return res.status(400).json({ message: 'Invalid enclosedto array' });
    }

    // Update the 'enclosedto' field
    const correspondence = await Correspondence.findByIdAndUpdate(
      cid,
      { enclosedto },
      { new: true }
    );

    if (!correspondence) {
      return res.status(404).json({ message: 'Correspondence not found' });
    }

    // Update the 'enclosedfrom' in referenced documents
    await AddEnclosedin(enclosedto, cid, "enclosedto");

    res.status(200).json({ message: "success" });
  } catch (error) {
    //////console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const AddEnclosedfrom = async (req, res) => {
  try {
    const { enclosedfrom } = req.body;
    const cid = req.params.id;

    // Find correspondence by id
    let correspondence = await Correspondence.findById(cid);

    if (!correspondence) {
      return res.status(404).json({ message: 'Correspondence not found' });
    }

    // Update 'enclosedto'
    correspondence.enclosedfrom = enclosedfrom;
    await correspondence.save();

    res.status(200).json({ message: "success" });
  } catch (error) {
    //////console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Reply Reply Reply Reply
const AddReplyin = async (replyto, cid, type) => {
  try {
    // Convert cid to string
    const str = cid.toString();

    if (type === "replyto") {
      // Validate if replyto is an array and has elements
      if (!Array.isArray(replyto)) {
        throw new Error("replyto is not a valid array");
      }

      // Addition of New References
      for (let i = 0; i < replyto.length; i++) {
        // Convert replyto items to string
        const replyId = replyto[i].toString();
        const correspondence = await Correspondence.findById(replyId);
        if (!correspondence) continue;

        // Add the cid to enclosedfrom if it's not already present
        if (!correspondence.replyfrom.some(id => id.toString() === str)) {
          correspondence.replyfrom.push(str);
          await correspondence.save();
        }
      }

      // Removal of earlier references
      const correspondences = await Correspondence.find({ replyfrom: str });
      for (let i = 0; i < correspondences.length; i++) {
        const correspondence = correspondences[i];

        // Convert each id in replyfrom to string for comparison
        const replyfromIds = correspondence.replyfrom.map(id => id.toString());

        // Remove cid from replyfrom if it's not in the new enclosedto array
        if (!replyto.some(id => id.toString() === correspondence._id.toString())) {
          correspondence.replyfrom = replyfromIds.filter(id => id !== str);
          await correspondence.save();
        }
      }
    }
  } catch (error) {
    //////console.log(error);
    throw error;  // Ensure the error is propagated up the stack
  }
};


const AddReply = async (req, res) => {
  try {
    const { replyto } = req.body;
    const cid = req.params.id;

    //////console.log("Request Body:", req.body); // Log the request body

    // Validate if replyto is provided and is an array
    if (!replyto || !Array.isArray(replyto)) {
      return res.status(400).json({ message: 'Invalid replyto array' });
    }

    // Update the 'replyto' field
    const correspondence = await Correspondence.findByIdAndUpdate(
      cid,
      { replyto },
      { new: true }
    );

    if (!correspondence) {
      return res.status(404).json({ message: 'Correspondence not found' });
    }

    // Update the 'enclosedfrom' in referenced documents
    await AddReplyin(replyto, cid, "replyto");

    res.status(200).json({ message: "success" });
  } catch (error) {
    //////console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const AddReplyfrom = async (req, res) => {
  try {
    const { enclosedfrom } = req.body;
    const cid = req.params.id;

    // Find correspondence by id
    let correspondence = await Correspondence.findById(cid);

    if (!correspondence) {
      return res.status(404).json({ message: 'Correspondence not found' });
    }

    // Update 'enclosedto'
    correspondence.enclosedfrom = enclosedfrom;
    await correspondence.save();

    res.status(200).json({ message: "success" });
  } catch (error) {
    //////console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createCorrespondence,
  getAllCorrespondences,
  getCorrespondenceById,
  updateCorrespondence,
  deleteCorrespondence,
  createcorrhistory,
  viewcorrhistory,
  updatecorrorder,
  AddReference,
  AddReffrom,
  AddReffromin,
  AddEnclosures,
  AddEnclosedin,
  AddEnclosedfrom,
  AddReply,
  AddReplyin,
  AddReplyfrom,
  getLinkedCorrespondences
};
