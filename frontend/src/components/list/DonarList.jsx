const getHospital = async () => {
    try {
      const config = {
        withCredentials: true, // Include this option to send credentials with the request
      };
      const {data }= await axios.get(
        "http://localhost:8080/api/v1/inventory/get-hospital",
        config
      );

      setData(data.hospital);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHospital();
  }, []);



  const getBloodRecord= async() => {
    try {
      const config = {
        withCredentials: true, // Include this option to send credentials with the request
      };
      const {data} = await axios.get("http://localhost:8080/api/v1/inventory/get-inventory",config)
      if(data?.success) {
        setData(data?.inventories)
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getBloodRecord()
  },[])



  const getOrg = async () => {
    try {
      const config = {
        withCredentials: true, // Include this option to send credentials with the request
      };
      if (user?.role === "donar") {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/inventory/organisation",
          config
        );
        if (data?.success) {
          setData(data?.organisation);
        }
      }
      if (user?.role === "hospital") {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/inventory/orgforhospital",
          config
        );

        if (data?.success) {
          setData(data?.organisation);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrg();
  }, [user]);



  const getDonars = async () => {
    try {
      const config = {
        withCredentials: true, // Include this option to send credentials with the request
      };
      const {data} = await axios.post("http://localhost:8080/api/v1/inventory/get-inventory-hospital",{
        filters:{
            inventoryType:'in',
            donar: user?._id,
        }
      },config)
     setData(data.inventories)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDonars();
  },[])