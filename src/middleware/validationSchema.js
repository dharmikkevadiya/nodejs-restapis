// validationMiddleware.js
const { celebrate, Joi } = require('celebrate');

const LoginValidation = celebrate({
  body: Joi.object({
    emailAddress: Joi.string().email().required(),
    password: Joi.string().required(),
    latitude: Joi.string().allow('', null),
    longitude: Joi.string().allow('', null),
  }).unknown(true),
});

const IdValidation = celebrate({
  params: {
    id: Joi.string().hex().length(24).required(), // Validate that id is a valid ObjectId
  },
});

// workers
const AddWorkerValidation = celebrate({
  body: Joi.object({
    workerNo: Joi.string().required(),
    alterNo: Joi.string().required(),
    emailAddress: Joi.string().email().required(),
    password: Joi.string().required(),
    mpassword: Joi.string().allow(null, ''),
    post: Joi.string().hex().length(24).required(), // Assuming post is an ObjectId
    role: Joi.string().hex().length(24).required(), // Assuming role is an ObjectId
    company: Joi.string().hex().length(24).required(), // Assuming company is an ObjectId

    machineNo: Joi.string().allow('', null),
    name: Joi.string().allow('', null),
    reference: Joi.string().allow('', null),
    aadharNo: Joi.string().allow('', null),
    mobileNo: Joi.string().allow('', null),
    bankDetails: Joi.object({
      bankAccountName: Joi.string().allow('', null),
      ifscCode: Joi.string().allow('', null),
      bankAccountNumber: Joi.string().allow('', null),
    }),
    status: Joi.string().allow('', null),
    aadharCard: Joi.string().allow('', null),
    aadharCardBack: Joi.string().allow('', null),
    profile: Joi.string().allow('', null),
    bankPassbook: Joi.string().allow('', null),
    signature: Joi.string().allow('', null),
    dateOfBirth: Joi.string().allow('', null),
    joiningDate: Joi.string().allow('', null),
    blockNo: Joi.string().allow('', null),
    age: Joi.number().default(0),
    workers: Joi.array().items(Joi.string().hex().length(24)), // Assuming workers is an array of ObjectId
  }).unknown(true),
});

const UpdateWorkerValidation = celebrate({
  params: {
    id: Joi.string().hex().length(24).required(), // Validate that id is a valid ObjectId
  },
  body: Joi.object({
    workerNo: Joi.string().required(),
    company: Joi.string().hex().length(24).required(), // Assuming company is an ObjectId
    alterNo: Joi.string().allow('', null),
    emailAddress: Joi.string().allow('', null).email().allow('', null),
    mpassword: Joi.string().allow('', null),
    post: Joi.string().hex().length(24), // Assuming post is an ObjectId
    role: Joi.string().hex().length(24), // Assuming role is an ObjectId
    machineNo: Joi.string().allow('', null),
    name: Joi.string().allow('', null),
    reference: Joi.string().allow('', null),
    aadharNo: Joi.string().allow('', null),
    mobileNo: Joi.string().allow('', null),
    bankDetails: Joi.object({
      bankAccountName: Joi.string().allow('', null),
      ifscCode: Joi.string().allow('', null),
      bankAccountNumber: Joi.string().allow('', null),
    }),
    status: Joi.string().allow('', null),
    aadharCard: Joi.string().allow('', null),
    aadharCardBack: Joi.string().allow('', null),
    profile: Joi.string().allow('', null),
    bankPassbook: Joi.string().allow('', null),
    signature: Joi.string().allow('', null),
    dateOfBirth: Joi.string().allow('', null),
    joiningDate: Joi.string().allow('', null),
    blockNo: Joi.string().allow('', null),
    age: Joi.number().default(0),
    workers: Joi.array().items(Joi.string().hex().length(24)), // Assuming workers is an array of ObjectId
  }).unknown(true),
});

// item
const CreateStockinValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
  }).unknown(true),
});

const UpdateStockinValidation = celebrate({
  params: {
    id: Joi.string().hex().length(24).required(),
  },
  body: Joi.object({
    name: Joi.string().allow('', null),
    type: Joi.string().allow('', null),
  }).unknown(true),
});

// stocksin

const CreateItemValidation = celebrate({
  body: Joi.object({
    addDate: Joi.date().required(),
    challanNo: Joi.string().required(),
    designId: Joi.string().hex().length(24).required(),
    companyId: Joi.string().hex().length(24).required(),
    l: Joi.string().allow('', null),
    panna: Joi.string().allow('', null),
    programPis: Joi.string().allow('', null),
    // details: Joi.array().items(
    //   Joi.object({
    //     kurti: Joi.string().allow('', null),
    //     cut: Joi.string().allow('', null),
    //     taka: Joi.string().allow('', null),
    //     mtr: Joi.string().allow('', null),
    //     totlaPis: Joi.string().allow('', null),
    //   })
    // ),
    // patti: Joi.array().items(
    //   Joi.object({
    //     patti: Joi.string().allow('', null),
    //     mtr: Joi.string().allow('', null),
    //     line: Joi.string().allow('', null),
    //     cut: Joi.string().allow('', null),
    //     taka: Joi.string().allow('', null),
    //     totalPis: Joi.string().allow('', null),
    //   })
    // ),
    // gala: Joi.object({
    //   pis: Joi.array().items(
    //     Joi.object({
    //       progrmaPis: Joi.string().allow('', null),
    //       mtr: Joi.string().allow('', null),
    //       cut: Joi.string().allow('', null),
    //       taka: Joi.string().allow('', null),
    //     })
    //   ),
    //   mtr: Joi.array().items(
    //     Joi.object({
    //       programPis: Joi.string().allow('', null),
    //       taka: Joi.string().allow('', null),
    //       totalPis: Joi.string().allow('', null),
    //     })
    //   ),
    // }),
    // Dupatta: Joi.array().items(
    //   Joi.object({
    //     dupatta: Joi.string().allow('', null),
    //     taka: Joi.string().allow('', null),
    //     totalPis: Joi.string().allow('', null),
    //   })
    // ),
    partyName: Joi.string().allow('', null),
  }).unknown(true),
});

const UpdateItemValidation = celebrate({
  params: {
    id: Joi.string().hex().length(24).required(),
  },
  body: Joi.object({
    addDate: Joi.date().allow('', null),
    challanNo: Joi.string().allow('', null),
    designId: Joi.string().hex().length(24).allow('', null),
    companyId: Joi.string().hex().length(24).required('', null),
    l: Joi.string().allow('', null),
    panna: Joi.string().allow('', null),
    programPis: Joi.string().allow('', null),
    // details: Joi.array().items(
    //   Joi.object({
    //     kurti: Joi.string().allow('', null),
    //     cut: Joi.string().allow('', null),
    //     taka: Joi.string().allow('', null),
    //     mtr: Joi.string().allow('', null),
    //     totlaPis: Joi.string().allow('', null),
    //   })
    // ),
    // patti: Joi.array().items(
    //   Joi.object({
    //     patti: Joi.string().allow('', null),
    //     mtr: Joi.string().allow('', null),
    //     line: Joi.string().allow('', null),
    //     cut: Joi.string().allow('', null),
    //     taka: Joi.string().allow('', null),
    //     totalPis: Joi.string().allow('', null),
    //   })
    // ),
    // gala: Joi.object({
    //   pis: Joi.array().items(
    //     Joi.object({
    //       progrmaPis: Joi.string().allow('', null),
    //       mtr: Joi.string().allow('', null),
    //       cut: Joi.string().allow('', null),
    //       taka: Joi.string().allow('', null),
    //     })
    //   ),
    //   mtr: Joi.array().items(
    //     Joi.object({
    //       programPis: Joi.string().allow('', null),
    //       taka: Joi.string().allow('', null),
    //       totalPis: Joi.string().allow('', null),
    //     })
    //   ),
    // }),
    // Dupatta: Joi.array().items(
    //   Joi.object({
    //     dupatta: Joi.string().allow('', null),
    //     taka: Joi.string().allow('', null),
    //     totalPis: Joi.string().allow('', null),
    //   })
    // ),
    partyName: Joi.string().allow('', null),
    // challanPic: Joi.array().items(Joi.string().allow('', null)),
    // mtrDetailPic: Joi.array().items(Joi.string().allow('', null)),
    // cuttingSizeRatioPic: Joi.array().items(Joi.string().allow('', null)),
    // workerPic: Joi.string().allow('', null),
  }).unknown(true),
});

// program
const CreateProgramValidation = celebrate({
  body: Joi.object({
    designId: Joi.string().hex().length(24).required(),
    // size: Joi.array()
    //   .items
    //   // Joi.object({
    //   //   size: Joi.string(),
    //   //   value: Joi.string(),
    //   // })
    //   (),
    stockInPic: Joi.string().allow('', null),
    finalPis: Joi.string(),
    // programDetails: Joi.array().items(
    //   Joi.object({
    //     avg: Joi.string(),
    //     balanceMtr: Joi.string(),
    //     cut: Joi.string(),
    //     kurti: Joi.string(),
    //     kurtiCut: Joi.string(),
    //     totlaPis: Joi.string(),
    //     usedMtr: Joi.string(),
    //   })
    // ),
    remark: Joi.array().items(Joi.string().allow('', null)),
  }).unknown(true),
});

const UpdateProgramValidation = celebrate({
  params: {
    id: Joi.string().hex().length(24).required(),
  },
  body: Joi.object({
    designId: Joi.string().hex().length(24).allow('', null),
    size: Joi.array().items(Joi.string().allow('', null)),
    stockInPic: Joi.string().allow('', null),
    finalPis: Joi.string(),
    // programDetails: Joi.array().items(
    //   Joi.object({
    //     avg: Joi.string(),
    //     balanceMtr: Joi.string(),
    //     cut: Joi.string(),
    //     kurti: Joi.string(),
    //     kurtiCut: Joi.string(),
    //     totlaPis: Joi.string(),
    //     usedMtr: Joi.string(),
    //   })
    // ),
    remark: Joi.array().items(Joi.string().allow('', null)),
  }).unknown(true),
});

// worker issues
const CreateWorkerIssueValidation = celebrate({
  body: Joi.object({
    designId: Joi.string().hex().length(24).required(),
    workerId: Joi.string().hex().length(24).required(),
    alterNo: Joi.string().required(),
    time: Joi.string().allow('', null),
    date: Joi.string().allow('', null),
    size: Joi.string().allow('', null),
    issuePis: Joi.string().allow('', null),
    totalPis: Joi.string().allow('', null),
  }).unknown(true),
});

const UpdateWorkerIssueValidation = celebrate({
  params: {
    id: Joi.string().hex().length(24).required(),
  },
  body: Joi.object({
    designId: Joi.string().hex().length(24).allow('', null),
    workerId: Joi.string().hex().length(24).allow('', null),
    alterNo: Joi.string().allow('', null),
    time: Joi.string().allow('', null),
    date: Joi.string().allow('', null),
    size: Joi.string().allow('', null),
    issuePis: Joi.string().allow('', null),
    totalPis: Joi.string().allow('', null),
    process: Joi.string().allow('', null),
  }).unknown(true),
});

// checkingWorkerReceived
const CreateCheckingWorkerReceivedValidation = celebrate({
  body: Joi.object({
    designId: Joi.string().hex().length(24).required(),
    reciverName: Joi.string().required(),
    reciveTime: Joi.string().required(),
  }).unknown(true),
});

// checkingWorkerIssue
const CreateCheckingWorkerIssueValidation = celebrate({
  body: Joi.object({
    date: Joi.string().required(),
    time: Joi.string().required(),
    designId: Joi.string().hex().length(24).required(),
    // details: Joi.array().items(
    //   Joi.object({
    //     size: Joi.string().allow('', null),
    //     pis: Joi.number(),
    //     rate: Joi.string().allow('', null),
    //   })
    // ),
    // rejectPiss: Joi.array().items(
    //   Joi.object({
    //     size: Joi.string().allow('', null),
    //     pis: Joi.number(),
    //     description: Joi.string().allow('', null),
    //   })
    // ),
    checkrName: Joi.string().required(),
    chekerPic: Joi.string().allow('', null),
  }).unknown(true),
});

const UpdateCheckingWorkerIssueValidation = celebrate({
  params: {
    id: Joi.string().hex().length(24).required(),
  },
  body: Joi.object({
    date: Joi.string().allow('', null),
    time: Joi.string().allow('', null),
    designId: Joi.string().hex().length(24).allow('', null),
    // details: Joi.array().items(
    //   Joi.object({
    //     size: Joi.string().allow('', null),
    //     pis: Joi.number(),
    //     rate: Joi.string().allow('', null),
    //   })
    // ),
    // rejectPiss: Joi.array().items(
    //   Joi.object({
    //     size: Joi.string().allow('', null),
    //     pis: Joi.number(),
    //     description: Joi.string().allow('', null),
    //   })
    // ),
    checkrName: Joi.string().allow('', null),
    chekerPic: Joi.string().allow('', null),
  }).unknown(true),
});

// pressIssue

const CreatePressIssueValidation = celebrate({
  body: Joi.object({
    date: Joi.string().required(),
    time: Joi.string().required(),
    designId: Joi.string().hex().length(24).required(),
    // details: Joi.object({
    //   size: Joi.string().required(),
    //   pis: Joi.number().required(),
    // }).required(),
    // rejectPis: Joi.array().items(
    //   Joi.object({
    //     size: Joi.string().required(),
    //     pis: Joi.number().required(),
    //     description: Joi.string().required(),
    //   })
    // ),
    finalPis: Joi.number(),
    totalAmount: Joi.number().required(),
  }).unknown(true),
});

const UpdatePressIssueValidation = celebrate({
  params: {
    id: Joi.string().hex().length(24).required(),
  },
  body: Joi.object({
    date: Joi.string().allow('', null),
    time: Joi.string().allow('', null),
    designId: Joi.string().hex().length(24).allow('', null),
    // details: Joi.object({
    //   size: Joi.string().allow('', null),
    //   pis: Joi.number().allow('', null),
    // }).allow('', null),
    // rejectPis: Joi.array().items(
    //   Joi.object({
    //     size: Joi.string().allow('', null),
    //     pis: Joi.number().allow('', null),
    //     description: Joi.string().allow('', null),
    //   })
    // ),
    finalPis: Joi.number(),
    totalAmount: Joi.number().allow('', null),
  }).unknown(true),
});

// delivery issue

const CreateDeliveryIssueValidation = celebrate({
  body: Joi.object({
    date: Joi.string().required(),
    time: Joi.string().required(),
    billNo: Joi.string().required(),
    designId: Joi.string().hex().length(24).required(),

    partyName: Joi.string().allow('', null),
    sizes: Joi.array().items(Joi.string().required()).required(),
    totalPis: Joi.number().required(),
    authFor: Joi.string().required(),
  }).unknown(true),
});

const UpdateDeliveryIssueValidation = celebrate({
  params: {
    id: Joi.string().hex().length(24).required(),
  },
  body: Joi.object({
    date: Joi.string().allow('', null),
    time: Joi.string().allow('', null),
    designId: Joi.string().hex().length(24).allow('', null),
    billNo: Joi.string().allow('', null),
    partyName: Joi.string().allow('', null),
    sizes: Joi.array().items(Joi.string().allow('', null)),
    totalPis: Joi.number().allow(null),
    authFor: Joi.string().allow('', null),
  }).unknown(true),
});

module.exports = {
  LoginValidation,
  IdValidation,
  AddWorkerValidation,
  UpdateWorkerValidation,
  CreateItemValidation,
  UpdateItemValidation,
  CreateStockinValidation,
  UpdateStockinValidation,
  CreateProgramValidation,
  UpdateProgramValidation,
  CreateWorkerIssueValidation,
  UpdateWorkerIssueValidation,
  CreateCheckingWorkerReceivedValidation,
  CreatePressIssueValidation,
  UpdatePressIssueValidation,
  CreateDeliveryIssueValidation,
  UpdateDeliveryIssueValidation,
  CreateCheckingWorkerIssueValidation,
  UpdateCheckingWorkerIssueValidation,
};
