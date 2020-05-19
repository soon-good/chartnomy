# JUnit5 Benchmark
# 1. 일반적인 방법
JUnit5 를 이용해 성능 측정을 하고자 할때 아래의 interface 들을 overriding 한다. 
- BeforeAllCallback
    - BeforeEachCallback
        - BeforeTestExecutionCallback
        - AfterTestExecutionCallback
    - AfterEachCallback
- AfterAllCallback 

그리고 Store를 사용해 startime 과 currentTimeMillis 의 차이를 구하여 실행시간 값을 구한다.
예제는 아래와 같다.  
(참고자료 - [Junit5 Docs - 5.9.1. Before and After Test Execution Callbacks](https://junit.org/junit5/docs/snapshot/user-guide/#extensions-lifecycle-callbacks-before-after-execution))   
```java
import java.lang.reflect.Method;
import java.util.logging.Logger;

import org.junit.jupiter.api.extension.AfterTestExecutionCallback;
import org.junit.jupiter.api.extension.BeforeTestExecutionCallback;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.ExtensionContext.Namespace;
import org.junit.jupiter.api.extension.ExtensionContext.Store;

public class TimingExtension implements BeforeTestExecutionCallback, AfterTestExecutionCallback {

    private static final Logger logger = Logger.getLogger(TimingExtension.class.getName());

    private static final String START_TIME = "start time";

    @Override
    public void beforeTestExecution(ExtensionContext context) throws Exception {
        getStore(context).put(START_TIME, System.currentTimeMillis());
    }

    @Override
    public void afterTestExecution(ExtensionContext context) throws Exception {
        Method testMethod = context.getRequiredTestMethod();
        long startTime = getStore(context).remove(START_TIME, long.class);
        long duration = System.currentTimeMillis() - startTime;

        logger.info(() ->
            String.format("Method [%s] took %s ms.", testMethod.getName(), duration));
    }

    private Store getStore(ExtensionContext context) {
        return context.getStore(Namespace.create(getClass(), context.getRequiredTestMethod()));
    }

}
```

# 2. 커스터 마이징
그런데 나는 이런걸 원하는게 아니다. 어노테이션을 만들어서 원하는 메서드에 실행시간을 측정하도록 해주고 싶다.
예를 들면 ([참고 - StackOverflow](https://stackoverflow.com/questions/14892125/what-is-the-best-practice-to-determine-the-execution-time-of-the-business-releva))  
아래와 같은 코드를 커스텀한 어노테이션에 담아두고 어노테이션을 달아놓은 메서드에서만 실행하도록 하고 싶다.
```java
long start = System.currentTimeMillis();
//execute logic in between
long end = System.currentTimeMillis();
System.out.println("DEBUG: Logic A took " + (end - start) + " MilliSeconds");
```

## 참고할 만한 자료
- [Create Your Own Extensions](https://blog.codefx.org/design/architecture/junit-5-extension-model/#Custom-Annotations)
    - @ExtendWith(SpringExtension.class) 와 같은 어노테이션을 직접 만드는 예제
- [Creating Custom Java Annotations for Your Tests](https://www.swtestacademy.com/custom-java-annotations/)
    - 실제 필요한 기능을 어노테이션으로 작성할 때 보통 refleaction과 프레임워크에서 제공하는 XXXListener를 사용하는 편이다. 여기서는 해당 내용을 다루고 있다.